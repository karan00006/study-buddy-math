import { SPELLIT_WORDS, SpellitWord } from '../data/spellitWords';

const STORAGE_KEY = 'study_buddy_spellit_v1';
const LOCK_NAME = 'study_buddy_spellit_lock';

export interface SpellitState {
  displayedWordIds: string[];
  dailyAssignments: Record<string, string[]>;
  rememberedWordIds: string[];
}

export interface DailySpellitWords {
  words: SpellitWord[];
  state: SpellitState;
}

const emptyState = (): SpellitState => ({
  displayedWordIds: [],
  dailyAssignments: {},
  rememberedWordIds: [],
});

function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readState(): SpellitState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyState();

  const parsed: unknown = JSON.parse(raw);
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('displayedWordIds' in parsed) ||
    !Array.isArray(parsed.displayedWordIds) ||
    !('dailyAssignments' in parsed) ||
    typeof parsed.dailyAssignments !== 'object' ||
    parsed.dailyAssignments === null ||
    !('rememberedWordIds' in parsed) ||
    !Array.isArray(parsed.rememberedWordIds)
  ) {
    throw new Error('Spellit saved data is invalid. Clear this browser’s Spellit storage to continue.');
  }

  const displayedWordIds = parsed.displayedWordIds.filter((id): id is string => typeof id === 'string');
  const rememberedWordIds = parsed.rememberedWordIds.filter((id): id is string => typeof id === 'string');
  const dailyAssignments = parsed.dailyAssignments as Record<string, unknown>;
  const knownWordIds = new Set(SPELLIT_WORDS.map(({ id }) => id));

  if (
    !displayedWordIds.every((id) => knownWordIds.has(id)) ||
    !rememberedWordIds.every((id) => knownWordIds.has(id)) ||
    !Object.values(dailyAssignments).every(
      (ids) => Array.isArray(ids) && ids.length === 2 && ids.every((id) => typeof id === 'string' && knownWordIds.has(id))
    )
  ) {
    throw new Error('Spellit saved data does not match the available word bank.');
  }

  return {
    displayedWordIds: [...new Set(displayedWordIds)],
    dailyAssignments: dailyAssignments as Record<string, string[]>,
    rememberedWordIds: [...new Set(rememberedWordIds)],
  };
}

function saveState(state: SpellitState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function withStorageLock<T>(operation: () => T): Promise<T> {
  if (typeof navigator !== 'undefined' && navigator.locks) {
    return navigator.locks.request(LOCK_NAME, operation);
  }
  return Promise.resolve(operation());
}

export function getOrAssignDailyWords(date = new Date()): Promise<DailySpellitWords> {
  return withStorageLock(() => {
    const state = readState();
    const dateKey = getLocalDateKey(date);
    let assignedIds = state.dailyAssignments[dateKey];

    if (!assignedIds) {
      const displayed = new Set(state.displayedWordIds);
      const nextWords = SPELLIT_WORDS.filter(({ id }) => !displayed.has(id)).slice(0, 2);

      if (nextWords.length === 2) {
        assignedIds = nextWords.map(({ id }) => id);
        state.dailyAssignments[dateKey] = assignedIds;
        state.displayedWordIds.push(...assignedIds);
        saveState(state);
      }
    }

    const words = (assignedIds ?? [])
      .map((id) => SPELLIT_WORDS.find((word) => word.id === id))
      .filter((word): word is SpellitWord => Boolean(word));

    return { words, state };
  });
}

export function addRememberedWord(wordId: string): Promise<SpellitState> {
  return withStorageLock(() => {
    if (!SPELLIT_WORDS.some(({ id }) => id === wordId)) {
      throw new Error('This word is not in the Spellit word bank.');
    }

    const state = readState();
    if (!state.rememberedWordIds.includes(wordId)) {
      state.rememberedWordIds.push(wordId);
      saveState(state);
    }
    return state;
  });
}

export function loadSpellitState(): SpellitState {
  return readState();
}
