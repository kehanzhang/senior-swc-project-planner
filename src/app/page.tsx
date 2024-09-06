import ChatInterface from './components/ChatInterface';

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Chat Application</h1>
      <ChatInterface />
    </main>
  );
}
