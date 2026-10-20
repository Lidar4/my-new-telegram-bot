/**
 * @file src/index.ts
 * @description Clean Start Telegram Bot using GrammY & TypeScript
 * 
 * নিরাপত্তা নীতিমালা:
 * ১. কোনো Token এখানে হার্ডকোড করা যাবে না।
 * ২. Token শুধুমাত্র process.env.TELEGRAM_BOT_TOKEN থেকে পড়া হবে।
 * ৩. কোনো ত্রুটি বা লগে Token-এর মান কখনো প্রিন্ট করা হবে না।
 */

import { Bot, GrammyError, HttpError } from 'grammy';
import dotenv from 'dotenv';
import { validateBotToken, formatStartMessage, formatEchoResponse } from './bot/messages.ts';

// লোকাল .env ফাইল থেকে ভেরিয়েবল লোড করা (যদি থাকে)
dotenv.config();

/**
 * পরিবেশ চলক (Environment Variable) যাচাইকরণ
 */
const rawToken = process.env.TELEGRAM_BOT_TOKEN;
const validation = validateBotToken(rawToken);

if (!validation.isValid || !rawToken) {
  console.error('================================================================');
  console.error('⚠️ নিরাপত্তা সতর্কতা: বৈধ TELEGRAM_BOT_TOKEN পাওয়া যায়নি!');
  console.error(`কারণ: ${validation.reason}`);
  console.error('দয়া করে আপনার লোকাল .env ফাইলে অথবা হোস্টিং প্ল্যাটফর্মের');
  console.error('Environment Variables-এ TELEGRAM_BOT_TOKEN সেট করুন।');
  console.error('নোট: কোনো ফাইল বা কোডে সরাসরি আসল টোকেন লিখবেন না।');
  console.error('================================================================');
  process.exit(1);
}

// GrammY Bot ইনস্ট্যান্স তৈরি
const bot = new Bot(rawToken);

/**
 * /start কমান্ড হ্যান্ডলার
 */
bot.command('start', async (ctx) => {
  const userName = ctx.from?.first_name;
  await ctx.reply(formatStartMessage(userName));
});

/**
 * সাধারণ টেক্সট মেসেজ হ্যান্ডলার
 */
bot.on('message:text', async (ctx) => {
  const userMessage = ctx.message.text;
  await ctx.reply(formatEchoResponse(userMessage));
});

/**
 * নিরাপদ ত্রুটি ব্যবস্থাপনা (Safe Error Handling)
 * সতর্কতা: এই ব্লকে কখনো ctx বা error অবজেক্টের সিক্রেট হেডার বা টোকেন সরাসরি প্রিন্ট করা হয় না।
 */
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`[Error] আপডেট হ্যান্ডেল করার সময় সমস্যা হয়েছে (Update ID: ${ctx.update.update_id})`);
  
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error(`[GrammY Error] টেলিগ্রাম এপিআই ত্রুটি: ${e.description}`);
  } else if (e instanceof HttpError) {
    console.error('[Network Error] টেলিগ্রাম সার্ভারের সঙ্গে নেটওয়ার্ক যোগাযোগে সমস্যা হয়েছে।');
  } else {
    console.error('[Unknown Error] একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।');
  }
});

/**
 * বট চালু করার ফাংশন
 */
async function startBot() {
  try {
    console.log('বট চালু হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...');
    
    // লং পোলিং শুরু করা
    await bot.start({
      onStart: (botInfo) => {
        console.log('================================================================');
        console.log(`✅ বট সফলভাবে চালু হয়েছে!`);
        console.log(`🤖 বটের নাম: ${botInfo.first_name}`);
        console.log(`🔗 বটের ইউজারনেম: @${botInfo.username}`);
        console.log('🛑 বট থামাতে কীবোর্ডে Ctrl + C চাপুন।');
        console.log('================================================================');
      },
    });
  } catch (error) {
    console.error('বট চালু করার সময় সমস্যা হয়েছে। দয়া করে আপনার ইন্টারনেট বা টোকেনের বৈধতা পরীক্ষা করুন।');
  }
}

// গ্রেসফুল শাটডাউন (Ctrl + C দিলে সুন্দরভাবে বন্ধ হওয়া)
process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());

// বট শুরু করুন
startBot();
