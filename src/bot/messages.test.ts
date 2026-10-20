import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBotToken, formatStartMessage, formatEchoResponse } from './messages.ts';

test('validateBotToken rejects undefined, empty, or placeholder token', () => {
  assert.equal(validateBotToken(undefined).isValid, false);
  assert.equal(validateBotToken('').isValid, false);
  assert.equal(validateBotToken('   ').isValid, false);
  assert.equal(validateBotToken('your_telegram_bot_token_here').isValid, false);
});

test('validateBotToken rejects malformed token without leaking value', () => {
  const result = validateBotToken('invalid-format-token');
  assert.equal(result.isValid, false);
  assert.ok(result.reason);
  assert.equal(result.reason?.includes('invalid-format-token'), false);
});

test('validateBotToken accepts valid token format', () => {
  const result = validateBotToken('123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ_123');
  assert.equal(result.isValid, true);
  assert.equal(result.reason, undefined);
});

test('formatStartMessage formats greeting with name or fallback', () => {
  const messageWithName = formatStartMessage('Fardus');
  assert.ok(messageWithName.includes('Fardus'));
  assert.ok(messageWithName.includes('Telegram Bot'));

  const messageWithFallback = formatStartMessage();
  assert.ok(messageWithFallback.includes('বন্ধু'));
  assert.ok(messageWithFallback.includes('Telegram Bot'));
});

test('formatEchoResponse echoes user message cleanly', () => {
  const response = formatEchoResponse('Hello bot!');
  assert.ok(response.includes('Hello bot!'));
  assert.ok(response.includes('✅ বট যথাযথভাবে রেসপন্স করছে!'));
});
