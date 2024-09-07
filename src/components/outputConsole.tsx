import React, { useState, useEffect, useRef } from 'react';
import { useUserResponse } from '@/lib/contexts/UserResponseContext';
import Draggable from 'react-draggable';
import ConsoleCommand from './consoleCommand';

interface CommandOutput {
    command: string;
    output: string;
}

const OutputConsole: React.FC = () => {
    const { responses } = useUserResponse();
    const [isMinimized, setIsMinimized] = useState(false);
    const [displayedResponses, setDisplayedResponses] = useState(responses);
    const [isUpdating, setIsUpdating] = useState(false);
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (JSON.stringify(responses) !== JSON.stringify(displayedResponses)) {
            setIsUpdating(true);
            // Reset command history when updating
            setCommandHistory([]);

            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }

            updateTimeoutRef.current = setTimeout(() => {
                setDisplayedResponses(responses);
                setIsUpdating(false);
            }, 1000);
        }

        return () => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }
        };
    }, [responses, displayedResponses]);

    useEffect(() => {
        // Scroll to bottom when new commands are added
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [commandHistory]);

    const handleCommandSubmit = (command: string, gptResponse: string) => {
        setCommandHistory([...commandHistory, { command, output: gptResponse }]);
    };

    const handleConsoleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Prevent focus when clicking on scrollbar
        if (e.target === consoleRef.current) {
            const inputElement = consoleRef.current.querySelector('input');
            if (inputElement) {
                inputElement.focus();
            }
        }
    };

    return (
        <Draggable>
            <div
                ref={consoleRef}
                className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm absolute bottom-4 right-4 shadow-lg"
                style={{ width: '640px' }}
                onClick={handleConsoleClick}
            >
                <div className="flex justify-between mb-2">
                    <div className="text-blue-400">$ software-composer ~ %   <span className="text-white">echo formData</span></div>
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="text-yellow-500 hover:text-yellow-700"
                    >
                        {isMinimized ? '▲' : '▼'}
                    </button>
                </div>
                <div
                    ref={scrollRef}
                    className={`overflow-y-auto ${isMinimized ? 'h-0' : 'h-52'} transition-all duration-300`}
                >
                    <pre className="whitespace-pre-wrap">
                        <span className="text-yellow-500">
                            {isUpdating ? "Updating user information...\n" : ""}
                        </span>
                        {JSON.stringify(displayedResponses, null, 2)}
                    </pre>
                    {commandHistory.map((item, index) => (
                        <div key={index} className="mt-2">
                            <div className="text-blue-400">
                                $ software-composer ~ % <span className="text-white">{item.command}</span>
                            </div>
                            <div className="text-green-400 ml-4">Output: {item.output}</div>
                        </div>
                    ))}
                </div>
                <ConsoleCommand isMinimized={isMinimized} onCommandSubmit={handleCommandSubmit} reset={isUpdating} />
            </div>
        </Draggable>
    );
};

export default OutputConsole;
