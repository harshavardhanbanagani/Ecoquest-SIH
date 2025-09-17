import React, { useState, useEffect } from 'react';
import { Leaf, ArrowLeft } from 'lucide-react';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AuthModal from './components/AuthModal';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'teacher';
  avatar: string;
  level?: number;
  xp?: number;
  streak?: number;
  badges?: string[];
  rank?: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  xp: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  completed: boolean;
  deadline?: string;
  participants?: number;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  date: string;
  description: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'student' | 'teacher'>('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'student' | 'teacher'>('student');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initialize demo data
  useEffect(() => {
    // Load any saved user data from localStorage
    const savedUser = localStorage.getItem('ecoquest_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setCurrentView(user.type);
    }
  }, []);

  const handleAuth = (type: 'student' | 'teacher') => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  const handleLogin = (email: string, password: string, isSignUp: boolean = false) => {
    // Mock authentication with demo users
    const demoUsers: Record<string, User> = {
      'alex.chen@school.edu': {
        id: '1',
        name: 'Alex Chen',
        email: 'alex.chen@school.edu',
        type: 'student',
        avatar: '🌱',
        level: 15,
        xp: 2450,
        streak: 7,
        badges: ['🌱', '♻️', '💧', '⚡', '🚴', '🌳', '🏆', '⭐', '🌿', '🌟', '🔋', '🌍'],
        rank: 3
      },
      'teacher@school.edu': {
        id: '2',
        name: 'Dr. Sarah Wilson',
        email: 'teacher@school.edu',
        type: 'teacher',
        avatar: '👩‍🏫'
      }
    };

    let user = demoUsers[email];
    
    if (!user && isSignUp) {
      // Create new user for sign up
      user = {
        id: Date.now().toString(),
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        type: authType,
        avatar: authType === 'student' ? '🌱' : '👩‍🏫',
        ...(authType === 'student' && {
          level: 1,
          xp: 0,
          streak: 0,
          badges: [],
          rank: 999
        })
      };
    }

    if (user && (password === 'demo123' || isSignUp)) {
      setCurrentUser(user);
      localStorage.setItem('ecoquest_user', JSON.stringify(user));
      setShowAuthModal(false);
      setCurrentView(user.type);
    } else {
      alert('Invalid credentials. Use demo123 as password or try the demo credentials.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ecoquest_user');
    setCurrentView('landing');
  };

  const updateUser = (updates: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('ecoquest_user', JSON.stringify(updatedUser));
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'student':
        return currentUser ? (
          <StudentDashboard 
            user={currentUser} 
            onLogout={handleLogout} 
            onUpdateUser={updateUser}
            onBackToHome={() => setCurrentView('landing')}
          />
        ) : null;
      case 'teacher':
        return currentUser ? (
          <TeacherDashboard 
            user={currentUser} 
            onLogout={handleLogout} 
            onBackToHome={() => setCurrentView('landing')}
          />
        ) : null;
      default:
        return <LandingPage onAuth={handleAuth} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {renderCurrentView()}
      {showAuthModal && (
        <AuthModal
          type={authType}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;