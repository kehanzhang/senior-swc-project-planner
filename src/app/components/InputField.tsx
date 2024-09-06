import React, { useRef, useEffect } from 'react';

interface InputFieldProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function InputField({ input, handleInputChange, handleSubmit, isLoading, handleKeyDown }: InputFieldProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange(e);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="px-4">
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    className="w-full p-3 pr-24 border rounded resize-none overflow-hidden min-h-[46px]"
                    rows={1}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-1 bg-blue-500 text-white rounded"
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </form>
    );
}