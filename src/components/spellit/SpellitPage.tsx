import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  RotateCcw,
  Search,
  Sparkles,
  Volume2,
} from 'lucide-react';
import {
  addRememberedWord,
  DailySpellitWords,
  getOrAssignDailyWords,
} from '../../services/spellit';
import { SPELLIT_WORDS, SpellitWord } from '../../data/spellitWords';

type Section = 'daily' | 'remembered' | 'quiz';

interface QuizQuestion {
  word: SpellitWord;
  options: string[];
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[otherIndex]] = [shuffled[otherIndex], shuffled[index]];
  }
  return shuffled;
}

function makeQuiz(rememberedWords: SpellitWord[]): QuizQuestion[] {
  return shuffle(rememberedWords).map((word) => {
    const otherMeanings = [...new Set(
      rememberedWords
        .filter((candidate) => candidate.id !== word.id)
        .map((candidate) => candidate.meaningUrdu)
    )].filter((meaning) => meaning !== word.meaningUrdu);
    return {
      word,
      options: shuffle([word.meaningUrdu, ...shuffle(otherMeanings).slice(0, 3)]),
    };
  });
}

function formatToday(): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

export const SpellitPage: React.FC = () => {
  const [section, setSection] = useState<Section>('daily');
  const [daily, setDaily] = useState<DailySpellitWords | null>(null);
  const [rememberedWords, setRememberedWords] = useState<SpellitWord[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isSavingWord, setIsSavingWord] = useState<string | null>(null);

  const refreshDailyContent = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getOrAssignDailyWords();
      setDaily(result);
      setRememberedWords(loadRememberedWords(result.state.rememberedWordIds));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Spellit could not load saved words.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshDailyContent();
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      void refreshDailyContent();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const rememberedIds = daily?.state.rememberedWordIds ?? [];
  const hasEnoughQuizMeanings = new Set(rememberedWords.map(({ meaningUrdu }) => meaningUrdu)).size >= 4;
  const filteredRemembered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return rememberedWords;
    return rememberedWords.filter((word) =>
      `${word.word} ${word.meaning} ${word.meaningUrdu} ${word.synonyms.join(' ')}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [rememberedWords, search]);

  const rememberWord = async (word: SpellitWord) => {
    setIsSavingWord(word.id);
    setError(null);
    try {
      const state = await addRememberedWord(word.id);
      setRememberedWords(loadRememberedWords(state.rememberedWordIds));
      setDaily((current) => current ? { ...current, state } : current);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The word could not be saved.');
    } finally {
      setIsSavingWord(null);
    }
  };

  const startQuiz = () => {
    setQuiz(makeQuiz(rememberedWords));
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    if (hasSubmittedAnswer) {
      if (questionIndex + 1 === quiz.length) {
        setQuizFinished(true);
      } else {
        setQuestionIndex((index) => index + 1);
        setSelectedAnswer(null);
        setHasSubmittedAnswer(false);
      }
      return;
    }

    const currentQuestion = quiz[questionIndex];
    const nextScore = score + (selectedAnswer === currentQuestion.word.meaningUrdu ? 1 : 0);
    setScore(nextScore);
    setHasSubmittedAnswer(true);
  };

  const tabs: { id: Section; label: string; count?: number }[] = [
    { id: 'daily', label: 'Today’s words' },
    { id: 'remembered', label: 'Remembered', count: rememberedIds.length },
    { id: 'quiz', label: 'Quiz' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-pop-in">
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 p-6 sm:p-9 text-white shadow-lg shadow-indigo-200">
        <div className="flex items-center gap-2 text-sm font-bold text-indigo-100">
          <Sparkles className="h-4 w-4 text-amber-300" />
          SPELLIT · DAILY VOCABULARY
        </div>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
          A couple of new words, every day.
        </h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-indigo-100">
          Build your vocabulary one small step at a time. Save words you want to remember, then test yourself.
        </p>
      </div>

      <nav aria-label="Spellit sections" className="mb-7 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSection(tab.id)}
            aria-current={section === tab.id ? 'page' : undefined}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors cursor-pointer ${
              section === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`rounded-full px-2 py-0.5 text-xs ${section === tab.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {error && (
        <div role="alert" className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}

      {section === 'daily' && (
        <section aria-labelledby="daily-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">{formatToday()}</p>
              <h2 id="daily-heading" className="mt-1 font-heading text-2xl font-bold text-slate-900">Your two words</h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <Check className="h-3.5 w-3.5" /> No repeats
            </span>
          </div>

          {isLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm font-medium text-slate-500">
              Loading today’s words…
            </div>
          ) : daily?.words.length === 2 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {daily.words.map((word, index) => (
                <article key={word.id} className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">WORD {index + 1} OF 2</span>
                    <button type="button" title={`Hear ${word.word}`} aria-label={`Hear ${word.word}`} onClick={() => speak(word.word)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 cursor-pointer">
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                  <h3 className="font-heading text-3xl font-extrabold text-slate-900">{word.word}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{word.meaning}</p>
                  <p lang="ur" dir="rtl" className="mt-2 text-right text-xl font-semibold text-indigo-800">{word.meaningUrdu}</p>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Synonyms</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {word.synonyms.map((synonym) => <span key={synonym} className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">{synonym}</span>)}
                    </div>
                    {word.antonyms && word.antonyms.length > 0 && (
                      <>
                        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">Antonyms</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {word.antonyms.map((antonym) => <span key={antonym} className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">{antonym}</span>)}
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    disabled={rememberedIds.includes(word.id) || isSavingWord === word.id}
                    onClick={() => void rememberWord(word)}
                    className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                      rememberedIds.includes(word.id)
                        ? 'bg-emerald-50 text-emerald-700 cursor-default'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer disabled:opacity-60'
                    }`}
                  >
                    {rememberedIds.includes(word.id) ? <><Check className="h-4 w-4" /> Remembered</> : <><BookOpen className="h-4 w-4" /> Remember this word</>}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            !error && (
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center">
                <h3 className="font-heading text-lg font-bold text-amber-900">You’ve learned every word in this word bank.</h3>
                <p className="mt-2 text-sm text-amber-800">Spellit won’t repeat a word. Add more vocabulary to the local bank to continue.</p>
              </div>
            )
          )}
        </section>
      )}

      {section === 'remembered' && (
        <section aria-labelledby="remembered-heading">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Your personal word list</p>
              <h2 id="remembered-heading" className="mt-1 font-heading text-2xl font-bold text-slate-900">Words to remember</h2>
            </div>
            <label className="relative block sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search remembered words" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
            </label>
          </div>
          {isLoading ? (
            <p className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500">Loading your words…</p>
          ) : filteredRemembered.length > 0 ? (
            <div className="space-y-3">
              {filteredRemembered.map((word) => (
                <details key={word.id} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span>
                      <span className="font-heading text-lg font-bold text-slate-900">{word.word}</span>
                      <span className="ml-3 text-sm text-slate-500">{word.meaning}</span>
                    </span>
                    <span className="shrink-0 text-xs font-bold text-indigo-600 group-open:hidden">Review</span>
                    <span className="hidden shrink-0 text-xs font-bold text-slate-400 group-open:inline">Close</span>
                  </summary>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p lang="ur" dir="rtl" className="text-right text-lg font-semibold text-indigo-800">{word.meaningUrdu}</p>
                    <p className="mt-3 text-xs text-slate-500"><strong>Synonyms:</strong> {word.synonyms.join(', ')}</p>
                    {word.antonyms && word.antonyms.length > 0 && <p className="mt-1 text-xs text-slate-500"><strong>Antonyms:</strong> {word.antonyms.join(', ')}</p>}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 font-semibold text-slate-700">{search ? 'No matching words found.' : 'Your remembered words will appear here.'}</p>
              {!search && <button type="button" onClick={() => setSection('daily')} className="mt-3 text-sm font-bold text-indigo-600 hover:underline cursor-pointer">Explore today’s words <ArrowRight className="inline h-4 w-4" /></button>}
            </div>
          )}
        </section>
      )}

      {section === 'quiz' && (
        <section aria-labelledby="quiz-heading" className="mx-auto max-w-2xl">
          <div className="mb-6 text-center">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700"><CircleHelp className="h-6 w-6" /></span>
            <h2 id="quiz-heading" className="mt-3 font-heading text-2xl font-bold text-slate-900">Remembered words quiz</h2>
            <p className="mt-1 text-sm text-slate-500">Choose the Urdu meaning. Every question and option comes from your remembered words.</p>
          </div>
          {quiz.length > 0 && !quizFinished ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>QUESTION {questionIndex + 1} OF {quiz.length}</span>
                <span>SCORE {score}</span>
              </div>
              <h3 className="text-center font-heading text-3xl font-extrabold text-slate-900">{quiz[questionIndex].word.word}</h3>
              <p className="mt-2 text-center text-sm text-slate-500">What does this word mean?</p>
              <div className="mt-6 grid gap-3">
                {quiz[questionIndex].options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    disabled={hasSubmittedAnswer}
                    onClick={() => setSelectedAnswer(option)}
                    className={`rounded-xl border px-4 py-3 text-right text-lg font-semibold transition-colors cursor-pointer disabled:cursor-default ${
                      hasSubmittedAnswer && option === quiz[questionIndex].word.meaningUrdu
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                        : hasSubmittedAnswer && option === selectedAnswer
                          ? 'border-rose-300 bg-rose-50 text-rose-800'
                          : selectedAnswer === option
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-100'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50'
                    }`}
                    lang="ur"
                    dir="rtl"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {hasSubmittedAnswer && (
                <p role="status" className={`mt-4 text-center text-sm font-bold ${selectedAnswer === quiz[questionIndex].word.meaningUrdu ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {selectedAnswer === quiz[questionIndex].word.meaningUrdu
                    ? 'Correct!'
                    : `Not quite. The correct answer is ${quiz[questionIndex].word.meaningUrdu}.`}
                </p>
              )}
              <button type="button" disabled={!selectedAnswer} onClick={submitAnswer} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">
                {hasSubmittedAnswer ? questionIndex + 1 === quiz.length ? 'See results' : 'Next question' : 'Check answer'} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : quizFinished ? (
            <div className="rounded-3xl border border-indigo-100 bg-white p-8 text-center shadow-sm">
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-7 w-7" /></span>
              <h3 className="mt-4 font-heading text-2xl font-extrabold text-slate-900">Quiz complete!</h3>
              <p className="mt-2 text-slate-600">You scored <strong className="text-indigo-700">{score} out of {quiz.length}</strong>.</p>
              <button type="button" onClick={startQuiz} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700 cursor-pointer"><RotateCcw className="h-4 w-4" /> Try again</button>
            </div>
          ) : !hasEnoughQuizMeanings ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-7 text-center">
              <p className="font-semibold text-slate-800">Remember at least four words with different meanings to start a quiz.</p>
              <p className="mt-1 text-sm text-slate-500">Each question needs four distinct options, all drawn from your saved words.</p>
              <button type="button" onClick={() => setSection('daily')} className="mt-4 text-sm font-bold text-indigo-600 hover:underline cursor-pointer">Go to today’s words <ArrowRight className="inline h-4 w-4" /></button>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
              <p className="text-sm text-slate-600">{rememberedWords.length} words are ready for your quiz.</p>
              <button type="button" onClick={startQuiz} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700 cursor-pointer"><Sparkles className="h-4 w-4" /> Start quiz</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

function loadRememberedWords(ids: string[]): SpellitWord[] {
  const byId = new Map(SPELLIT_WORDS.map((word) => [word.id, word]));
  return ids.map((id) => byId.get(id)).filter((word): word is SpellitWord => Boolean(word));
}

function speak(text: string): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}
