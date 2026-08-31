/**
 * AI Study Buddy Tutor Service
 * 
 * Powered by Google Gemini Free API (Gemini 2.5 Flash / 1.5 Flash) with
 * an offline Smart Pedagogical AI Tutor fallback.
 */

import { MathQuestion } from '../math-engine/types';

const STORAGE_KEY_API_KEY = 'study_buddy_gemini_api_key';

export function getStoredApiKey(): string {
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
  return localStorage.getItem(STORAGE_KEY_API_KEY) || envKey || '';
}

export function saveStoredApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
}

export interface AITutorResponse {
  answer: string;
  source: 'gemini-api' | 'smart-tutor-engine';
}

/**
 * Generates an intelligent pedagogical answer to a student's math question
 */
export async function askAITutor(
  studentQuery: string,
  currentQuestion: MathQuestion
): Promise<AITutorResponse> {
  const apiKey = getStoredApiKey();

  // If user provided a Gemini API Key, use the official free Gemini API endpoint
  if (apiKey) {
    try {
      const prompt = `You are "Buddy", a friendly, encouraging math tutor for middle school students (Grades 6–8, ages 11–14).
Current Problem:
Grade: Grade ${currentQuestion.grade}
Topic: ${currentQuestion.topicName}
Question: ${currentQuestion.prompt}
${currentQuestion.mathExpression ? `Math Expression: ${currentQuestion.mathExpression}` : ''}
Key Solution Concept: ${currentQuestion.solution.formula || currentQuestion.solution.steps.join(' ')}

Student's Question: "${studentQuery}"

Instructions for your response:
1. Use warm, age-appropriate, encouraging language with simple analogies (e.g. pizza slices, money, steps).
2. Help the student understand the *concept* and *why* it works without directly just giving away the final number if they haven't solved it yet.
3. Keep your response concise (2-4 brief paragraphs or bullet points).
4. Use friendly emojis sparingly.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { answer: text, source: 'gemini-api' };
        }
      }
    } catch {
      // Fall through to offline smart tutor
    }
  }

  // Smart Offline AI Tutor Fallback
  return {
    answer: generateSmartTutorResponse(studentQuery, currentQuestion),
    source: 'smart-tutor-engine',
  };
}

/**
 * Built-in pedagogical response generator when offline or no API key is set
 */
function generateSmartTutorResponse(query: string, q: MathQuestion): string {
  const qLower = query.toLowerCase();

  if (qLower.includes('why') && (qLower.includes('flip') || qLower.includes('reciprocal') || qLower.includes('divide'))) {
    return `Great question! 💡 When you divide fractions like in **${q.topicName}**, think of division as asking: *"How many groups of this size fit inside?"*\n\nDividing by a half is the exact same thing as multiplying by 2 (because two halves make a whole!). That's why the "Keep, Change, Flip" rule works: multiplying by the flipped fraction (reciprocal) counts how many pieces you get.`;
  }

  if (qLower.includes('pizza') || qLower.includes('real life') || qLower.includes('analogy') || qLower.includes('example')) {
    return `Here is a fun way to visualize this: 🍕\n\nImagine you have a pizza cut into equal slices. The bottom number (denominator) tells you the total size of each slice, and the top number (numerator) tells you how many slices you actually have on your plate!\n\nWhen we solve **${q.prompt}**, we are just seeing how those slices combine or divide up.`;
  }

  if (qLower.includes('simpler') || qLower.includes('easier') || qLower.includes('break down')) {
    return `Let's break this down into bite-sized steps! 🐾\n\n1. **Look at what is given:** ${q.prompt.split('.')[0]}.\n2. **Identify the goal:** We want to find the missing value.\n3. **First move:** ${q.hints[0] || 'Write out your equation on the scratchpad.'}\n\nTake it one small step at a time!`;
  }

  if (qLower.includes('formula') || qLower.includes('rule')) {
    const formula = q.solution.formula || 'the core relationship between these quantities';
    return `Here is the key formula for this problem: 📐\n\n**${formula}**\n\n${q.solution.steps[0]}\n\nPlug in the numbers you know and solve for the one you need!`;
  }

  // General contextual tutor response
  return `Hi there! 👋 Let's tackle this **Grade ${q.grade} ${q.topicName}** problem together.\n\n💡 **Hint to get you going:** ${q.hints[0]}\n\nRemember: ${q.solution.steps[0]}\n\nUse the **Scratchpad** tool on screen to draw out your thinking! You've got this!`;
}
