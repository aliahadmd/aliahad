import { useEffect, useState } from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function Portfolio() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/src/assets/personal/portfolio.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading portfolio content:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Portfolio</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <MarkdownRenderer content={content} />
        </div>
      </main>
    </div>
  );
}
