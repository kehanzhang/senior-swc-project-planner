import React from 'react';
import { Message } from 'ai';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
    messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                </div>
            ))}
        </div>
    );
}