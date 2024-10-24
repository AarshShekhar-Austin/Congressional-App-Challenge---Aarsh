import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LearningModule from './components/LearningModule';
import LessonPage from './components/LessonPage';
import PersonalizedNotes from './components/PersonalizedNotes';
import Games from './components/Games';
import BalloonPop from './components/BalloonPop';
import FinalExam from './components/FinalExam';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn/:module" element={<LearningModule />} />
          <Route path="/learn/:module/unit/:unit/lesson/:lesson" element={<LessonPage />} />
          <Route path="/learn/:module/unit/:unit/lesson/:lesson/notes" element={<PersonalizedNotes />} />
          <Route path="/notes" element={<PersonalizedNotes />} />
          <Route path="/games" element={<Games />} />
          <Route path="/balloon-pop" element={<BalloonPop />} />
          <Route path="/final-exam" element={<FinalExam />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;