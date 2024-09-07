import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface ConsoleCommandProps {
    isMinimized: boolean;
    onCommandSubmit: (command: string, gptResponse: string) => void;
    reset?: boolean;
}

const ConsoleCommand: React.FC<ConsoleCommandProps> = ({ isMinimized, onCommandSubmit, reset }) => {
    const [command, setCommand] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && command.trim()) {
            e.preventDefault();
            const gptResponse = await fetchGPTResponse(command);
            onCommandSubmit(command, gptResponse);
            setCommand('');
        }
    };

    const fetchGPTResponse = async (userPrompt: string) => {
        try {
            const response = await fetch('/api/openai/wittyTerminal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [{ role: 'user', content: userPrompt }] }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error fetching GPT response:', error);
            return 'Error fetching response';
        }
    };

    useEffect(() => {
        if (reset) {
            setCommand('');
        }
    }, [reset]);

    useEffect(() => {
        const updateCursorPosition = () => {
            if (inputRef.current && cursorRef.current) {
                const inputRect = inputRef.current.getBoundingClientRect();
                const cursorLeft = command ? inputRef.current.scrollWidth : 0;
                cursorRef.current.style.left = `${cursorLeft}px`;
                cursorRef.current.style.height = `${inputRect.height}px`;
            }
        };

        updateCursorPosition();
        window.addEventListener('resize', updateCursorPosition);

        return () => {
            window.removeEventListener('resize', updateCursorPosition);
        };
    }, [command]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div
            className={`flex items-center ${isMinimized ? 'hidden' : ''}`}
            onClick={() => inputRef.current?.focus()}
        >
            <span className="text-blue-400">$ software-composer ~ %</span>
            <div className="relative flex-grow ml-2">
                {!isFocused && (
                    <div
                        ref={cursorRef}
                        className="absolute top-0 w-2 bg-white animate-blink"
                        style={{ left: '0px' }}
                    ></div>
                )}
                <input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="bg-transparent border-none outline-none text-white w-full"
                    placeholder=""
                />
            </div>
        </div>
    );
};

export default ConsoleCommand;