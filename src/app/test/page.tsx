'use client';

import { useState } from 'react';
import { generateSteps } from '../actions/generateSteps';
import { readStreamableValue } from 'ai/rsc';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function TestPage() {
    const [idea, setIdea] = useState('');
    const [steps, setSteps] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { steps: stepsStream } = await generateSteps(idea);

        for await (const partialSteps of readStreamableValue(stepsStream)) {
            if (partialSteps) {
                setSteps(JSON.stringify(partialSteps, null, 2));
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Project Step Generator</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Enter your project idea..."
                    className="w-full p-2 border rounded"
                    rows={4}
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Generate Steps
                </button>
            </form>
            {steps && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Generated Steps:</h2>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">{steps}</pre>
                </div>
            )}
        </div>
    );
}