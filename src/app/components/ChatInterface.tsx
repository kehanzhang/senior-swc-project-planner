'use client';

import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import MessageList from './MessageList';
import InputField from './InputField';
import ModelSelector from './ModelSelector';
import ErrorDisplay from './ErrorDisplay';
import LoadingIndicator from './LoadingIndicator';

export default function ChatInterface() {
    const [model, setModel] = useState('gpt-4');

    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/chat',
        body: { model },
    });

    useEffect(() => {
        const savedModel = localStorage.getItem('selectedModel');
        if (savedModel) setModel(savedModel);
    }, []);

    const handleModelChange = (newModel: string) => {
        setModel(newModel);
        localStorage.setItem('selectedModel', newModel);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <ModelSelector model={model} onModelChange={handleModelChange} />
            <MessageList messages={messages} />
            <InputField
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                handleKeyDown={handleKeyDown}  // Pass the handleKeyDown function
            />
            {error && <ErrorDisplay error={error} />}
            {isLoading && <LoadingIndicator />}
        </div>
    );
}