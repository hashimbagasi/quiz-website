import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { quizzes } from './data/quizzes';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import NotFound from './components/NotFound';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage quizzes={quizzes} />} />
          <Route path="/quiz/:id" element={<QuizPage quizzes={quizzes} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
