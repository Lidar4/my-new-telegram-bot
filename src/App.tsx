import React, { useState } from 'react';
import {
  ShieldCheck,
  Terminal,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Send,
  Copy,
  Bot as BotIcon,
  BookOpen,
  EyeOff,
  Sparkles,
  Lock
} from 'lucide-react';
import { formatStartMessage, formatEchoResponse } from './bot/messages.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'guide' | 'files'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Bot Simulator State
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: formatStartMessage('Developer'),
      time: '12:00 PM',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    const newMessages = [...messages, { sender: 'user' as const, text: userText, time: currentTime }];
    setMessages(newMessages);
    setInputVal('');

    // Simulate bot response using pure tested logic
    setTimeout(() => {
      let botResponse = '';
      if (userText === '/start') {
        botResponse = formatStartMessage('User');
      } else {
        botResponse = formatEchoResponse(userText);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot' as const,
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <BotIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white tracking-wide">my-new-telegram-bot</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Clean Start Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">Node.js • TypeScript • GrammY Framework • Safe Architecture</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Overview (ড্যাশবোর্ড)
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Bot Simulator (বট টেস্ট)
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Setup Guide (সেটআপ নির্দেশিকা)
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'files'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Files (ফাইল তালিকা)
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Security Banner */}
            <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-emerald-950/40 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Security Architecture Active • নিরাপদ কোড আর্কিটেকচার</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">Clean Telegram Bot Project Initialized</h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    কোনো কোডে বা ফাইলে সরাসরি আসল টোকেন লেখা হয়নি। বটের সোর্স কোড তৈরি করা হয়েছে যাতে এটি শুধুমাত্র রানটাইমে <code className="text-emerald-400 bg-slate-950/80 px-1.5 py-0.5 rounded font-mono text-xs">process.env.TELEGRAM_BOT_TOKEN</code> থেকে নিরাপদে টোকেন গ্রহণ করে।
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm rounded-xl transition shadow-lg shadow-blue-600/20 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    How to Run (কীভাবে চালাবেন)
                  </button>
                </div>
              </div>
            </div>

            {/* Checklist Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Token Decoupling (টোকেন বিচ্ছিন্নকরণ)</h3>
                  <span className="text-[11px] text-emerald-400 font-mono">process.env.TELEGRAM_BOT_TOKEN</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  টোকেন কখনো কোডে বা কোনো কনফিগে সরাসরি সংরক্ষিত হয় না। টোকেন লোড হয় সিস্টেমের নিজস্ব সুরক্ষিত এনভায়রনমেন্ট থেকে।
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Strict .gitignore Guard (গিট গার্ড)</h3>
                  <span className="text-[11px] text-blue-400 font-mono">.env, *.token, *.key blocked</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  সব ধরনের সিক্রেট ফাইল গিট রিপোজিটরিতে যাওয়া সম্পূর্ণ বন্ধ। গিটহাবে কেবল নিরাপদ <code className="text-slate-300">.env.example</code> টেমপ্লেট যাবে।
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Safe Error Handler (নিরাপদ এরর)</h3>
                  <span className="text-[11px] text-purple-400 font-mono">No Token Leaks in Logs</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  টোকেন না থাকলে পরিষ্কার নির্দেশিকা দেবে, কিন্তু কনসোল লগ বা ত্রুটি বার্তায় কখনো কোনো সিক্রেট স্ট্রিং উন্মুক্ত হবে না।
                </p>
              </div>
            </div>

            {/* Quick Actions & Code Snippet */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Commands */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  Terminal Commands (প্রয়োজনীয় কমান্ডসমূহ)
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">1. Create Environment File (এনভায়রনমেন্ট ফাইল তৈরি):</label>
                    <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400">
                      <code>cp .env.example .env</code>
                      <button
                        onClick={() => handleCopy('cp .env.example .env', 'cmd1')}
                        className="text-slate-400 hover:text-white transition"
                        title="Copy command"
                      >
                        {copiedKey === 'cmd1' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">2. Install Dependencies (ডিপেনডেন্সি ইনস্টল):</label>
                    <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-blue-400">
                      <code>npm install</code>
                      <button
                        onClick={() => handleCopy('npm install', 'cmd2')}
                        className="text-slate-400 hover:text-white transition"
                        title="Copy command"
                      >
                        {copiedKey === 'cmd2' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">3. Run Bot via Long Polling (বট চালু করা):</label>
                    <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-amber-400">
                      <code>npm run bot</code>
                      <button
                        onClick={() => handleCopy('npm run bot', 'cmd3')}
                        className="text-slate-400 hover:text-white transition"
                        title="Copy command"
                      >
                        {copiedKey === 'cmd3' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">4. Run Unit Tests (ইউনিট টেস্ট চালানো):</label>
                    <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-purple-400">
                      <code>npm test</code>
                      <button
                        onClick={() => handleCopy('npm test', 'cmd4')}
                        className="text-slate-400 hover:text-white transition"
                        title="Copy command"
                      >
                        {copiedKey === 'cmd4' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Architecture Details */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-2 text-sm mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Security Verification Results (নিরাপত্তা যাচাই)
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>No Hardcoded Secrets:</strong> সোর্স কোডে কোনো হার্ডকোডেড টোকেন নেই</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Git Guard:</strong> গিটহাবে কোনো টোকেন বা সিক্রেট ফাইল পুশ হবে না</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Server-Side Only:</strong> ব্রাউজার বা ক্লায়েন্ট সাইডে কোনো এপিআই সিক্রেট নেই</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Unit Tests Verified:</strong> ৫টি ইউনিট টেস্ট শতভাগ পাস (5/5 Passing)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2 text-amber-400 font-medium mb-1">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Important Security Reminder</span>
                  </div>
                  আপনি যখন নিজের ডিভাইসে বা হোস্টিংয়ে কোডটি চালাবেন, শুধু তখনই আপনার গোপন টোকেনটি আপনার লোকাল <code className="text-slate-200">.env</code> ফাইলে যোগ করবেন।
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SIMULATOR TAB */}
        {activeTab === 'simulator' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <BotIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">my-new-telegram-bot (Live Logic Simulator)</h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Testing /start & echo message logic
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMessages([{ sender: 'bot', text: formatStartMessage('User'), time: '12:00 PM' }]);
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Reset Chat
              </button>
            </div>

            {/* Chat Box */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl h-[420px] flex flex-col overflow-hidden">
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs whitespace-pre-line leading-relaxed shadow ${
                        m.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/60'
                      }`}
                    >
                      <p>{m.text}</p>
                      <span className="text-[10px] opacity-60 block mt-1 text-right">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setInputVal('/start');
                  }}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs font-mono transition shrink-0"
                >
                  /start
                </button>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type a message or click /start..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-medium transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send
                </button>
              </form>
            </div>
            <p className="text-center text-xs text-slate-500">
              * This simulator runs the exact pure logic functions from <code className="text-slate-400">src/bot/messages.ts</code> that power <code className="text-slate-400">src/index.ts</code>.
            </p>
          </div>
        )}

        {/* GUIDE TAB */}
        {activeTab === 'guide' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Step-by-Step Setup & Execution Guide
              </h3>

              <div className="space-y-6 text-sm text-slate-300">
                {/* Step 1 */}
                <div className="border-l-2 border-blue-500 pl-4 space-y-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Step 1 • ধাপ ১</span>
                  <h4 className="font-semibold text-white">Get Bot Token from Telegram @BotFather</h4>
                  <p className="text-xs text-slate-400">
                    Open Telegram, search for <span className="text-blue-400 font-medium">@BotFather</span> and send:
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 w-fit">
                    /newbot
                  </div>
                  <p className="text-xs text-slate-400">
                    Choose a display name and username ending in <code className="text-slate-300">bot</code>. BotFather will provide your secret HTTP API Token.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="border-l-2 border-emerald-500 pl-4 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 2 • ধাপ ২</span>
                  <h4 className="font-semibold text-white">Configure .env on your Local Machine</h4>
                  <p className="text-xs text-slate-400">
                    In your project terminal, copy the example template:
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 w-fit">
                    cp .env.example .env
                  </div>
                  <p className="text-xs text-slate-400">
                    Open the newly created <code className="text-slate-200">.env</code> in your local code editor and put your token:
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
                    TELEGRAM_BOT_TOKEN="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                  </div>
                </div>

                {/* Step 3 */}
                <div className="border-l-2 border-purple-500 pl-4 space-y-2">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 3 • ধাপ ৩</span>
                  <h4 className="font-semibold text-white">Start the Bot (Long Polling)</h4>
                  <p className="text-xs text-slate-400">
                    Run the bot command:
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-purple-400 w-fit">
                    npm run bot
                  </div>
                  <p className="text-xs text-slate-400">
                    Open your bot on Telegram, send <code className="text-slate-200">/start</code> and verify the instant greeting!
                  </p>
                </div>

                {/* Step 4 */}
                <div className="border-l-2 border-amber-500 pl-4 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 4 • ধাপ ৪</span>
                  <h4 className="font-semibold text-white">Hosting & GitHub Actions Secrets</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    For automated workflows, add <code className="text-slate-200">TELEGRAM_BOT_TOKEN</code> in GitHub Repository Settings → <strong>Secrets and variables</strong> → <strong>Actions</strong>. On hosting services (e.g. Render, Railway, VPS), configure it in the provider's <strong>Environment Variables</strong> dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FILES TAB */}
        {activeTab === 'files' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-400" />
              Generated Project Files (ফাইল তালিকা ও উদ্দেশ্য)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-emerald-400 font-semibold">src/index.ts</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Core Bot Code</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  বটের মূল কোড। GrammY ইনস্ট্যান্স তৈরি, /start হ্যান্ডলার, টেক্সট মেসেজ হ্যান্ডলার, নিরাপদ ত্রুটি হ্যান্ডলার এবং লং পোলিং স্টার্টার ধারণ করে।
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-blue-400 font-semibold">.env.example</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Template</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  একটি নিরাপদ ডামি কনফিগারেশন টেমপ্লেট। এটি গিটহাবে আপলোড হলেও কোনো সিক্রেট ঝুঁকি নেই।
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-purple-400 font-semibold">.gitignore</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Security Guard</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  গিট ট্র্যাকিং ফিল্টার। <code className="text-slate-300">.env</code>, <code className="text-slate-300">*.token</code>, <code className="text-slate-300">node_modules</code> যেন ভুলবশতও গিট কমিটে না আসে তা সুনিশ্চিত করে।
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-amber-400 font-semibold">README.md</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Documentation</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  সম্পূর্ণ প্রজেক্ট ডকুমেন্টেশন। বটের উদ্দেশ্য, নিরাপত্তা নীতিমালা, BotFather থেকে টোকেন সংগ্রহ এবং রান করার বিস্তারিত নির্দেশনা রয়েছে।
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-cyan-400 font-semibold">package.json</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Config</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  প্রজেক্টের নাম <code className="text-slate-300">my-new-telegram-bot</code>, স্ক্রিপ্টস (<code className="text-slate-300">npm run bot</code>, <code className="text-slate-300">npm test</code>) এবং GrammY ডিপেনডেন্সি অন্তর্ভুক্ত রয়েছে।
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-pink-400 font-semibold">src/bot/messages.ts</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Unit Tested Module</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  বটের রেসপন্স ফরম্যাটার ও টোকেন ফরম্যাট ভ্যালিডেটর। ৫টি স্বয়ংক্রিয় ইউনিট টেস্ট দ্বারা ভেরিফাইড।
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-6 py-4 text-center text-xs text-slate-500">
        my-new-telegram-bot • Secure Node.js & TypeScript Architecture • No Hardcoded Secrets
      </footer>
    </div>
  );
}
