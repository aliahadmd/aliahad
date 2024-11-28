import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages';
import AboutMe from './pages/AboutMe';
import Notes from './pages/Notes';
import Portfolio from './pages/Portfolio';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center text-gray-900 hover:text-gray-600">
              Home
            </Link>
            <Link to="/" className="flex items-center text-gray-900 hover:text-gray-600">
              About Me
            </Link>
            <Link to="/notes" className="flex items-center text-gray-900 hover:text-gray-600">
              Notes
            </Link>
            <Link to="/portfolio" className="flex items-center text-gray-900 hover:text-gray-600">
              Portfolio
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}
