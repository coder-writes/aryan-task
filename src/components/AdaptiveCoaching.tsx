import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ArrowLeft, Send, BrainCircuit, User, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/src/lib/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const SYSTEM_PROMPT = `You are Genyx AI Coach — an expert AI fitness and movement intelligence assistant built by Genyx, India's first AI Movement Intelligence Platform.

Your role:
- Provide personalized coaching advice for strength training, mobility, injury prevention, and exercise form.
- Analyze movement patterns described by users and suggest corrections.
- Offer fatigue management and recovery insights.
- Help coaches and athletes optimize their training programs.

Guidelines:
- Be concise, knowledgeable, and encouraging.
- Use evidence-based fitness and biomechanics principles.
- When discussing exercises, emphasize proper form and safety.
- If asked about medical conditions, recommend consulting a healthcare professional.
- Keep responses focused and actionable.
- Use markdown formatting for structured responses when helpful.`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AdaptiveCoaching = () => {
    const { theme, toggleTheme } = useTheme();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content:
                "Hey! I'm your **Genyx AI Coach** 🏋️\n\nI can help you with:\n- **Form correction** advice for any exercise\n- **Training program** optimization\n- **Injury prevention** and recovery tips\n- **Fatigue management** strategies\n\nWhat would you like to work on today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: trimmed,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const conversationHistory = messages
                .filter((m) => m.id !== 'welcome')
                .map((m) => ({
                    role: m.role === 'assistant' ? 'model' as const : 'user' as const,
                    parts: [{ text: m.content }],
                }));

            conversationHistory.push({
                role: 'user' as const,
                parts: [{ text: trimmed }],
            });

            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: conversationHistory,
                config: {
                    systemInstruction: SYSTEM_PROMPT,
                    maxOutputTokens: 1024,
                    temperature: 0.7,
                },
            });

            const text = response.text || "I'm sorry, I couldn't generate a response. Please try again.";

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: text,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Gemini API error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content:
                    "Sorry, I'm having trouble connecting right now. Please check your API key or try again in a moment.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatContent = (content: string) => {
        // Simple markdown-like rendering
        return content.split('\n').map((line, i) => {
            // Bold
            let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Inline code
            formatted = formatted.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-sm font-mono">$1</code>');
            // Bullet points
            if (formatted.startsWith('- ')) {
                return (
                    <div key={i} className="flex gap-2 ml-2">
                        <span className="text-accent mt-1.5 text-xs">●</span>
                        <span dangerouslySetInnerHTML={{ __html: formatted.slice(2) }} />
                    </div>
                );
            }
            if (formatted.trim() === '') return <br key={i} />;
            return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
        });
    };

    const quickPrompts = [
        'How do I fix my squat form?',
        'Create a push-pull-legs split',
        'Tips for injury prevention',
        'How to manage training fatigue',
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Header */}
            <motion.header
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass"
            >
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="p-2 rounded-xl hover:bg-accent/10 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="bg-accent p-2 rounded-xl">
                                <BrainCircuit className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg leading-tight">Adaptive AI Coach</h1>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                                        Online — AI Coach
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-accent p-1 rounded-lg rotate-12">
                                <Activity className="w-4 h-4 text-black" />
                            </div>
                            <span className="text-lg font-extrabold tracking-tight hidden sm:inline">
                                Ge<span className="text-accent">nyx</span>
                            </span>
                        </Link>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full glass hover:text-accent transition-all"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Chat Area */}
            <div className="pt-24 pb-36 px-4 max-w-3xl mx-auto">
                <AnimatePresence mode="popLayout">
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex gap-3 mb-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.role === 'assistant' && (
                                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center mt-1">
                                    <Sparkles className="w-4 h-4 text-accent" />
                                </div>
                            )}

                            <div
                                className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${message.role === 'user'
                                    ? 'bg-accent text-black rounded-br-md font-medium'
                                    : 'glass rounded-bl-md'
                                    }`}
                            >
                                <div className="space-y-1">{formatContent(message.content)}</div>
                                <div
                                    className={`text-[10px] mt-2 font-mono uppercase tracking-wider ${message.role === 'user' ? 'text-black/40' : 'text-slate-400 dark:text-slate-500'
                                        }`}
                                >
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>

                            {message.role === 'user' && (
                                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-slate-200 dark:bg-white/10 flex items-center justify-center mt-1">
                                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Loading indicator */}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 mb-6"
                    >
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-accent" />
                        </div>
                        <div className="glass rounded-2xl rounded-bl-md px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                                <span className="font-mono text-xs uppercase tracking-wider">Thinking...</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Quick prompts - show when only welcome message */}
                {messages.length === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8"
                    >
                        {quickPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setInput(prompt);
                                    setTimeout(() => {
                                        inputRef.current?.focus();
                                    }, 50);
                                }}
                                className="text-left glass p-4 rounded-2xl text-sm hover:border-accent/40 hover:shadow-[0_0_20px_rgba(198,241,53,0.08)] transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-2 mb-1 text-accent text-xs font-mono uppercase tracking-wider">
                                    <Sparkles className="w-3 h-3" />
                                    Try asking
                                </div>
                                <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                    {prompt}
                                </span>
                            </button>
                        ))}
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-4 bg-gradient-to-t from-background via-background to-transparent dark:from-background-dark dark:via-background-dark">
                <div className="max-w-3xl mx-auto">
                    <div className="glass rounded-2xl p-2 flex items-end gap-2 shadow-lg">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask your AI coach anything..."
                            rows={1}
                            className="flex-1 bg-transparent px-4 py-3 text-sm resize-none outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 max-h-32 min-h-[44px]"
                            style={{
                                height: 'auto',
                                overflowY: input.split('\n').length > 3 ? 'auto' : 'hidden',
                            }}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                            }}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            className="p-3 rounded-xl bg-accent text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-hover transition-all flex-shrink-0"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 mt-2 font-mono uppercase tracking-wider">
                        Powered by Gemini 2.0 Flash — Genyx AI Labs
                    </p>
                </div>
            </div>
        </div>
    );
};
