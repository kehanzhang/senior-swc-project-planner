'use client';

import React from 'react';

interface ErrorDisplayProps {
    error: Error;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
    return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>Error: {error.message}</p>
        </div>
    );
}