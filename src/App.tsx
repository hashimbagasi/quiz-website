import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { quizzes } from './data/quizzes';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import NotFound from './components/NotFound';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';
import Contact from './components/Contact';
import Blog from './components/Blog';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage quizzes={quizzes} />} />
          <Route path="/quiz/:id" element={<QuizPage quizzes={quizzes} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
