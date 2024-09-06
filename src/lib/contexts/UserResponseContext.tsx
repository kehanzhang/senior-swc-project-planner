'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserResponses {
    projectDescription: string;
    operatingSystem: 'mac' | 'windows' | null;
    aiModel: 'gpt' | 'claude' | null;
    setupInstructions: boolean | null;
    firebaseInstructions: boolean | null;
}

interface UserResponseContextType {
    responses: UserResponses;
    updateResponse: (key: keyof UserResponses, value: string | boolean | null) => void;
}

const UserResponseContext = createContext<UserResponseContextType | undefined>(undefined);

export function UserResponseProvider({ children }: { children: ReactNode }) {
    const [responses, setResponses] = useState<UserResponses>({
        projectDescription: '',
        operatingSystem: null,
        aiModel: null,
        setupInstructions: null,
        firebaseInstructions: null,
    });

    const updateResponse = (key: keyof UserResponses, value: string | boolean | null) => {
        setResponses(prev => ({ ...prev, [key]: value }));
    };

    return (
        <UserResponseContext.Provider value={{ responses, updateResponse }}>
            {children}
        </UserResponseContext.Provider>
    );
}

export const useUserResponse = () => {
    const context = useContext(UserResponseContext);
    if (!context) {
        throw new Error('useUserResponse must be used within a UserResponseProvider');
    }
    return context;
};