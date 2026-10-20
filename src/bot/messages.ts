/**
 * @file src/bot/messages.ts
 * @description Pure helper functions for formatting bot messages and validating configuration safely.
 */

/**
 * Validates that the provided Telegram Bot token is formatted correctly and safe to use.
 * Never prints or leaks the token in logs or error return messages.
 */
export function validateBotToken(token?: string): { isValid: boolean; reason?: string } {
  if (!token || typeof token !== 'string') {
    return { isValid: false, reason: 'TELEGRAM_BOT_TOKEN environment variable is missing.' };
  }

  const trimmed = token.trim();
  if (trimmed === '') {
    return { isValid: false, reason: 'TELEGRAM_BOT_TOKEN environment variable is empty.' };
  }

  if (trimmed === 'your_telegram_bot_token_here' || trimmed.includes('your_telegram_bot_token_here')) {
    return { isValid: false, reason: 'TELEGRAM_BOT_TOKEN is still set to placeholder example value.' };
  }

  // Telegram bot tokens generally match <number>:<string>
  const tokenRegex = /^[0-9]+:[a-zA-Z0-9_-]+$/;
  if (!tokenRegex.test(trimmed)) {
    return { isValid: false, reason: 'TELEGRAM_BOT_TOKEN format is invalid (expected format: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ).' };
  }

  return { isValid: true };
}

/**
 * Generates the friendly welcome message for the /start command.
 */
export function formatStartMessage(userName?: string): string {
  const name = userName && userName.trim() ? userName.trim() : 'বন্ধু';
  return (
    `👋 স্বাগতম, ${name}!\n\n` +
    `এটি আমার সম্পূর্ণ নতুন এবং নিরাপদ Telegram Bot।\n` +
    `বটটি সফলভাবে সচল রয়েছে এবং আপনার মেসেজ গ্রহণ করতে প্রস্তুত।\n\n` +
    `যেকোনো সাধারণ টেক্সট মেসেজ লিখে পাঠিয়ে পরীক্ষা করে দেখতে পারেন।`
  );
}

/**
 * Generates the response for regular text messages.
 */
export function formatEchoResponse(userMessage: string): string {
  return (
    `📩 আপনার মেসেজটি পেয়েছি:\n"${userMessage}"\n\n` +
    `✅ বট যথাযথভাবে রেসপন্স করছে!`
  );
}
