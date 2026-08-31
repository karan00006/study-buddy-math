import React, { useState } from 'react';
import { MathQuestion } from '../../math-engine/types';
import {
  askAITutor,
  getStoredApiKey,
  saveStoredApiKey,
  AITutorResponse,
} from '../../services/aiTutor';
import { StudyBuddyLogo } from '../ui/StudyBuddyLogo';
import {
  Bot,
  Send,
  Sparkles,
  Key,
  X,
  HelpCircle,
  Pizza,
  Zap,
} from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: MathQuestion;
}

interface ChatMessage {
  sender: 'student' | 'tutor';
  text: string;
  source?: 'gemini-api' | 'smart-tutor-engine';
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  question,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'tutor',
      text: `Hi! I'm Buddy, your AI Math Tutor. 🦉 Need help understanding this **Grade ${question.grade} ${question.topicName}** question? Click one of the quick questions below or ask me anything!`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeySettings, setShowKeySettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getStoredApiKey());
  const [keySavedMessage, setKeySavedMessage] = useState(false);

  const quickPrompts = [
    { label: 'Why does this rule work?', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { label: 'Explain with a pizza / real-world analogy', icon: <Pizza className="w-3.5 h-3.5" /> },
    { label: 'Break it down simpler', icon: <Zap className="w-3.5 h-3.5" /> },
    { label: 'What formula should I use?', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { sender: 'student', text: textToSend.trim() },
    ];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response: AITutorResponse = await askAITutor(textToSend, question);
      setMessages([
        ...newMessages,
        { sender: 'tutor', text: response.answer, source: response.source },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          sender: 'tutor',
          text: "Oops, I had trouble answering that! Try writing out the problem on the Scratchpad, or check the 'Show Me How' button for step-by-step guidance.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    saveStoredApiKey(apiKeyInput);
    setKeySavedMessage(true);
    setTimeout(() => {
      setKeySavedMessage(false);
      setShowKeySettings(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col h-[600px] max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white">
          <div className="flex items-center gap-2.5">
            <StudyBuddyLogo size="sm" variant="icon" />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-heading font-bold text-base leading-tight">AI Math Tutor</h3>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  Free AI
                </span>
              </div>
              <p className="text-[11px] text-indigo-100 font-medium">Ask anything about this problem</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowKeySettings(!showKeySettings)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
              title="API Key Settings"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Gemini API Key Drawer */}
        {showKeySettings && (
          <div className="p-4 bg-slate-100 border-b border-slate-200 text-xs space-y-2 animate-pop-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Google Gemini API Key (Optional)</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% Free
              </span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Study Buddy includes a built-in smart AI tutor by default. If you have a free Gemini key from{' '}
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 underline font-semibold"
              >
                Google AI Studio
              </a>
              , paste it here for live AI answers:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-mono text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
              />
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all"
              >
                {keySavedMessage ? 'Saved! ✓' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {/* Chat message feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs sm:text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'student' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'tutor' && (
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.sender === 'student'
                    ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs font-medium'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-2xs whitespace-pre-line'
                }`}
              >
                {msg.text}
                {msg.source && (
                  <span className="block text-[10px] text-slate-400 mt-2 border-t border-slate-100 pt-1 font-mono">
                    Powered by {msg.source === 'gemini-api' ? 'Gemini 1.5 Flash API' : 'Smart AI Tutor Engine'}
                  </span>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium p-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1">Buddy is thinking...</span>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-2.5 bg-white border-t border-slate-200 flex flex-wrap gap-1.5">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(qp.label)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-2.5 py-1 rounded-lg transition-colors border border-slate-200/60"
            >
              {qp.icon}
              <span>{qp.label}</span>
            </button>
          ))}
        </div>

        {/* User Input Bar */}
        <div className="p-3 bg-slate-100/90 border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Buddy anything about this question..."
              className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-200 font-medium"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white shadow-xs transition-all flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
