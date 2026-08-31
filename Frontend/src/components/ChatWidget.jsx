import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
    // -----------------------------
    // State
    // -----------------------------
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: "Hi! 👋 I'm Hammad's AI assistant. Ask me anything about his experience, skills, projects, or background!",
            sources: null,
        },
    ]);

    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // -----------------------------
    // Refs
    // -----------------------------
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const chatbotRef = useRef(null);

    // Generate session ID only once
    const [sessionId] = useState(
        () => `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    );

    // -----------------------------
    // API URL Resolution
    // -----------------------------
    const getApiUrl = () => {
        // Explicit API URL from environment variable (if provided)
        if (import.meta.env?.VITE_API_URL) {
            const base = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
            return base.endsWith('/chat') ? base : `${base}/chat`;
        }

        // Relative endpoint: works on deployed site (Vercel rewrite) and local dev (Vite proxy)
        return '/chat';
    };

    // -----------------------------
    // Scroll to latest message
    // -----------------------------
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages, isTyping]);

    // -----------------------------
    // Focus input when chat opens
    // -----------------------------
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // -----------------------------
    // Close when clicking outside
    // -----------------------------
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                chatbotRef.current &&
                !chatbotRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, [isOpen]);

    // -----------------------------
    // Toggle chat
    // -----------------------------
    const toggleChat = () => {
        setIsOpen((prev) => !prev);
    };

    // -----------------------------
    // Send message
    // -----------------------------
    const handleSendMessage = async () => {
        const text = inputText.trim();

        // Prevent empty or duplicate requests
        if (!text || isTyping) {
            return;
        }

        // Add user message immediately
        setMessages((prev) => [
            ...prev,
            {
                type: 'user',
                text,
                sources: null,
            },
        ]);

        // Clear input
        setInputText('');

        // Disable further requests
        setIsTyping(true);

        try {
            const apiUrl = getApiUrl();
            console.log('Sending request to:', apiUrl);

            let response;
            try {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        query: text,
                        session_id: sessionId,
                    }),
                });
            } catch (networkErr) {
                // If relative /chat fails in dev, try direct backend URL on local host
                if (apiUrl === '/chat' && !import.meta.env?.PROD) {
                    const fallbackUrl = `http://${window.location.hostname || 'localhost'}:8000/chat`;
                    console.log('Retrying with direct fallback:', fallbackUrl);
                    response = await fetch(fallbackUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({
                            query: text,
                            session_id: sessionId,
                        }),
                    });
                } else {
                    throw networkErr;
                }
            }

            // Try to read JSON even when the response is an error
            let data = null;

            try {
                data = await response.json();
            } catch {
                data = null;
            }

            // -----------------------------
            // Handle 429
            // -----------------------------
            if (response.status === 429) {
                setMessages((prev) => [
                    ...prev,
                    {
                        type: 'bot',
                        text:
                            data?.detail ||
                            data?.message ||
                            "The AI service is temporarily busy because its API quota has been reached. Please try again in a little while.",
                        sources: null,
                    },
                ]);

                return;
            }

            // -----------------------------
            // Handle other HTTP errors
            // -----------------------------
            if (!response.ok) {
                console.error(
                    'Chat API Error:',
                    response.status,
                    data
                );

                throw new Error(
                    data?.detail ||
                        data?.message ||
                        `Server returned HTTP ${response.status}`
                );
            }

            // -----------------------------
            // Successful response
            // -----------------------------
            const answer =
                data?.answer ||
                data?.response ||
                data?.message ||
                "Sorry, I couldn't generate an answer.";

            const sources =
                Array.isArray(data?.sources) && data.sources.length > 0
                    ? data.sources
                    : null;

            setMessages((prev) => [
                ...prev,
                {
                    type: 'bot',
                    text: answer,
                    sources,
                },
            ]);
        } catch (error) {
            console.error('Chat API Error:', error);

            setMessages((prev) => [
                ...prev,
                {
                    type: 'bot',
                    text:
                        error.message?.includes('Failed to fetch')
                            ? "I can't connect to the chatbot server right now. Please make sure the backend is running."
                            : `Sorry, something went wrong: ${error.message}`,
                    sources: null,
                },
            ]);
        } finally {
            setIsTyping(false);

            // Focus input again
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    // -----------------------------
    // Enter key handler
    // -----------------------------
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    // -----------------------------
    // Render
    // -----------------------------
    return (
        <div
            ref={chatbotRef}
            className="chatbot-container"
        >
            {/* Floating button */}
            {!isOpen && (
                <button
                    className="chatbot-toggle"
                    onClick={toggleChat}
                    aria-label="Open chat"
                    type="button"
                >
                    💬
                </button>
            )}

            {/* Chat window */}
            <div
                className={`chatbot-window ${
                    isOpen ? 'open' : ''
                }`}
            >
                {/* Starry Night Overlay & Shooting Star */}
                <div className="starry-bg-overlay" />
                <div className="stars-twinkle" />
                <div className="shooting-star" />

                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-header-icon">
                            🌌
                        </div>

                        <div>
                            <h3>Ask about Hammad</h3>
                            <span className="online-status">
                                ● AI Assistant
                            </span>
                        </div>
                    </div>

                    <button
                        className="close-btn"
                        onClick={toggleChat}
                        aria-label="Close chat"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div
                            className="message-wrapper"
                            key={`${message.type}-${index}`}
                        >
                            <div
                                className={`message ${message.type}`}
                            >
                                {message.text}
                            </div>

                            {message.sources && (
                                <div className="message-sources">
                                    <span>📂 Sources:</span>{' '}
                                    {message.sources.join(', ')}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="typing-indicator active">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="chat-input-container">
                    <input
                        ref={inputRef}
                        type="text"
                        className="chat-input"
                        value={inputText}
                        onChange={(event) =>
                            setInputText(event.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder={
                            isTyping
                                ? 'Waiting for response...'
                                : 'Ask me anything...'
                        }
                        disabled={isTyping}
                        autoComplete="off"
                    />

                    <button
                        className="send-btn"
                        onClick={handleSendMessage}
                        disabled={
                            isTyping || !inputText.trim()
                        }
                        type="button"
                        aria-label="Send message"
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;