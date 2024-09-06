'use client';

import { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [projectDescription, setProjectDescription] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProjectDescription(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p className="text-xl mb-4">What are you trying to build? Describe the features, use-cases, and flow/pages involved.</p>
      <Textarea
        className="w-full max-w-4xl mb-6"
        placeholder="Enter your project description here..."
        rows={10}
        value={projectDescription}
        onChange={handleInputChange}
      />
      <div className="flex space-x-4">
        <Button className="w-64">Generate with GPT-4</Button>
        <Button variant="outline" className="w-64">Generate with Claude 3.5 Sonnet</Button>
      </div>
    </main>
  )
}
