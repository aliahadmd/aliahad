import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // This would need to be replaced with actual note fetching logic
    fetch('/src/assets/my-notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error loading notes:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note, index) => (
            <Link 
              key={index}
              to={`/notes/${note.id}`}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
              <p className="text-gray-600">{note.excerpt}</p>
              <div className="text-sm text-gray-500 mt-4">{note.date}</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
