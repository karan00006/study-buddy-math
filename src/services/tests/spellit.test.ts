import { beforeEach, describe, expect, it } from 'vitest';
import { SPELLIT_WORDS } from '../../data/spellitWords';
import {
  addRememberedWord,
  getOrAssignDailyWords,
  loadSpellitState,
} from '../spellit';

const storage = new Map<string, string>();

beforeEach(() => {
  storage.clear();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    },
  });
});

describe('Spellit storage', () => {
  it('assigns exactly two words once per day and does not repeat them on later days', async () => {
    const firstDay = await getOrAssignDailyWords(new Date(2026, 0, 1, 12));
    const sameDay = await getOrAssignDailyWords(new Date(2026, 0, 1, 12));
    const nextDay = await getOrAssignDailyWords(new Date(2026, 0, 2, 12));

    expect(firstDay.words).toHaveLength(2);
    expect(sameDay.words.map(({ id }) => id)).toEqual(firstDay.words.map(({ id }) => id));
    expect(nextDay.words).toHaveLength(2);
    expect(nextDay.words.some(({ id }) => firstDay.words.some((word) => word.id === id))).toBe(false);
    expect(loadSpellitState().displayedWordIds).toHaveLength(4);
    expect(SPELLIT_WORDS.length).toBeGreaterThanOrEqual(4);
  });

  it('persists remembered words without adding duplicates', async () => {
    const wordId = SPELLIT_WORDS[0].id;

    await addRememberedWord(wordId);
    await addRememberedWord(wordId);

    expect(loadSpellitState().rememberedWordIds).toEqual([wordId]);
  });
});
