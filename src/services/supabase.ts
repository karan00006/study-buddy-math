/**
 * Study Buddy Storage & Optional Supabase Cloud Sync
 * 
 * 100% Database-Free by default (utilizes client-side localStorage).
 * Optionally connects to free Supabase if VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are present.
 */

import { PracticeSessionResult } from '../math-engine/types';

export interface UserStats {
  totalQuestionsAnswered: number;
  totalCorrect: number;
  sessionsCompleted: number;
  currentStreak: number;
  bestAccuracy: number;
  lastActiveDate: string;
}

const STORAGE_KEY_STATS = 'study_buddy_user_stats';
const STORAGE_KEY_HISTORY = 'study_buddy_session_history';

/**
 * Gets student statistics from local storage
 */
export function getLocalStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore error
  }

  return {
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    sessionsCompleted: 0,
    currentStreak: 0,
    bestAccuracy: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
  };
}

/**
 * Saves completed practice session into client-side storage (database-free)
 */
export function saveSessionResult(result: PracticeSessionResult): UserStats {
  const currentStats = getLocalStats();
  const today = new Date().toISOString().split('T')[0];

  // Calculate streak
  let streak = currentStats.currentStreak;
  if (currentStats.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (currentStats.lastActiveDate === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }
  }

  const updatedStats: UserStats = {
    totalQuestionsAnswered: currentStats.totalQuestionsAnswered + result.totalQuestions,
    totalCorrect: currentStats.totalCorrect + result.correctCount,
    sessionsCompleted: currentStats.sessionsCompleted + 1,
    currentStreak: streak || 1,
    bestAccuracy: Math.max(currentStats.bestAccuracy, result.accuracy),
    lastActiveDate: today,
  };

  try {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(updatedStats));

    // Save session history (keep last 20)
    const rawHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
    const history: any[] = rawHistory ? JSON.parse(rawHistory) : [];
    history.unshift({
      id: Date.now(),
      grade: result.grade,
      topicName: result.topicName,
      difficulty: result.difficulty,
      accuracy: result.accuracy,
      correctCount: result.correctCount,
      totalQuestions: result.totalQuestions,
      date: new Date().toLocaleDateString(),
    });
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history.slice(0, 20)));
  } catch {
    // Ignore storage limit
  }

  return updatedStats;
}
