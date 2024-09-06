import React from 'react';

interface ModelSelectorProps {
    model: string;
    onModelChange: (model: string) => void;
}

export default function ModelSelector({ model, onModelChange }: ModelSelectorProps) {
    return (
        <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="p-2 border rounded"
        >
            <option value="gpt-4">OpenAI GPT-4</option>
            <option value="claude-3-sonnet-20240229">Anthropic Claude 3 Sonnet</option>
        </select>
    );
}