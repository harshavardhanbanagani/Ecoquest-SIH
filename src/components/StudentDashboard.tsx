import React, { useState, useEffect } from 'react';
import { User, Trophy, Target, Camera, Leaf, Zap, Star, Calendar, Users, Award, ChevronRight, LogOut, Upload, CheckCircle, Clock, Play, ArrowLeft } from 'lucide-react';
import QuestVerificationModal from './QuestVerificationModal';
import type { VerificationResult } from '../utils/imageVerification';
import type { User as UserType, Quest, Achievement } from '../App';

interface StudentDashboardProps {
  user: UserType;
  onLogout: () => void;
  onUpdateUser: (updates: Partial<UserType>) => void;
  onBackToHome?: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout, onUpdateUser, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quests' | 'leaderboard' | 'profile'>('dashboard');
  const [quests, setQuests] = useState<Quest[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // Initialize data
  useEffect(() => {
    const initialQuests: Quest[] = [
      {
        id: '1',
        title: 'No-Plastic Week',
        description: 'Avoid single-use plastics for 7 consecutive days and document your alternatives',
        progress: 5,
        total: 7,
        xp: 150,
        difficulty: 'Medium',
        category: 'Waste',
        completed: false,
        deadline: '2024-02-20'
      },
      {
        id: '2',
        title: 'Plant a Sapling',
        description: 'Plant a sapling and document its growth with photos',
        progress: 0,
        total: 1,
        xp: 200,
        difficulty: 'Easy',
        category: 'Biodiversity',
        completed: false
      },
      {
        id: '3',
        title: 'Energy Audit Challenge',
        description: 'Conduct a home energy audit and implement 3 improvements',
        progress: 1,
        total: 3,
        xp: 300,
        difficulty: 'Hard',
        category: 'Energy',
        completed: false,
        deadline: '2024-02-25'
      },
      {
        id: '4',
        title: 'Campus Cleanup Drive',
        description: 'Organize or participate in a campus cleanup activity',
        progress: 0,
        total: 1,
        xp: 250,
        difficulty: 'Medium',
        category: 'Community',
        completed: false,
        participants: 15
      },
      {
        id: '5',
        title: 'Water Conservation Week',
        description: 'Track and reduce your daily water usage for one week',
        progress: 0,
        total: 7,
        xp: 180,
        difficulty: 'Easy',
        category: 'Water',
        completed: false
      },
      {
        id: '6',
        title: 'Composting Workshop',
        description: 'Set up a composting system and maintain it for 2 weeks',
        progress: 0,
        total: 14,
        xp: 220,
        difficulty: 'Medium',
        category: 'Waste',
        completed: false
      }
    ];

    const initialAchievements: Achievement[] = [
      { id: '1', name: 'Water Guardian', icon: '💧', date: '2 days ago', description: 'Completed water conservation challenge' },
      { id: '2', name: 'Recycle Ranger', icon: '♻️', date: '1 week ago', description: 'Recycled 50+ items' },
      { id: '3', name: 'Green Commuter', icon: '🚴', date: '2 weeks ago', description: 'Used eco-friendly transport for 10 days' }
    ];

    setQuests(initialQuests);
    setAchievements(initialAchievements);
  }, []);

  const leaderboardData = [
    { rank: 1, name: 'Sarah Johnson', xp: 3200, avatar: '🌟', level: 18 },
    { rank: 2, name: 'Mike Rodriguez', xp: 2800, avatar: '🏆', level: 16 },
    { rank: 3, name: user.name, xp: user.xp || 2450, avatar: user.avatar, level: user.level || 15 },
    { rank: 4, name: 'Emma Wilson', xp: 2100, avatar: '🌿', level: 14 },
    { rank: 5, name: 'David Kim', xp: 1950, avatar: '⚡', level: 13 }
  ];

  const handleQuestClick = (quest: Quest) => {
    setSelectedQuest(quest);
    setShowVerificationModal(true);
  };

  const handleQuestSubmission = (verificationResult: VerificationResult) => {
    if (selectedQuest && verificationResult.isValid) {
      // Simulate quest progress update
      const updatedQuests = quests.map(quest => {
        if (quest.id === selectedQuest.id) {
          const newProgress = Math.min(quest.progress + 1, quest.total);
          const isCompleted = newProgress === quest.total;
          
          if (isCompleted && !quest.completed) {
            // Award XP and update user
            const newXP = (user.xp || 0) + quest.xp;
            const newLevel = Math.floor(newXP / 200) + 1;
            onUpdateUser({ 
              xp: newXP, 
              level: newLevel,
              streak: (user.streak || 0) + 1
            });

            // Add achievement
            const newAchievement: Achievement = {
              id: Date.now().toString(),
              name: `${quest.category} Champion`,
              icon: quest.category === 'Waste' ? '♻️' : quest.category === 'Energy' ? '⚡' : '🌱',
              date: 'Just now',
              description: `Completed ${quest.title}`
            };
            setAchievements(prev => [newAchievement, ...prev]);
          }

          return { ...quest, progress: newProgress, completed: isCompleted };
        }
        return quest;
      });

      setQuests(updatedQuests);
      setShowVerificationModal(false);
      setSelectedQuest(null);

      // Show success message
      alert(`Quest progress updated successfully! 🎉\nAI Confidence: ${Math.round(verificationResult.confidence * 100)}%`);
    }
  };

  const handleJoinQuest = (questId: string) => {
    const updatedQuests = quests.map(quest => {
      if (quest.id === questId) {
        return { ...quest, participants: (quest.participants || 0) + 1 };
      }
      return quest;
    });
    setQuests(updatedQuests);
    alert('Successfully joined the quest! 🚀');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Level</p>
              <p className="text-2xl font-bold text-green-600">{user.level}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((user.xp || 0) % 200) / 200 * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {(user.xp || 0) % 200}/200 XP to next level
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total XP</p>
              <p className="text-2xl font-bold text-blue-600">{user.xp}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-purple-600">{user.streak} days</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rank</p>
              <p className="text-2xl font-bold text-orange-600">#{user.rank}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Quests */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Active Quests</h3>
        <div className="space-y-4">
          {quests.filter(quest => !quest.completed).slice(0, 3).map((quest) => (
            <div key={quest.id} className="border border-gray-100 rounded-lg p-4 hover:border-green-200 transition-all hover:shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{quest.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      quest.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {quest.difficulty}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {quest.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{quest.description}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{quest.progress}/{quest.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <Star className="w-4 h-4" />
                      <span className="font-semibold">{quest.xp} XP</span>
                    </div>
                  </div>
                  {quest.deadline && (
                    <div className="flex items-center space-x-1 text-orange-600 text-sm mt-2">
                      <Clock className="w-4 h-4" />
                      <span>Due: {quest.deadline}</span>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleQuestClick(quest)}
                  className="ml-4 p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {achievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-100">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                {achievement.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{achievement.name}</p>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuests = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Available Quests</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <div key={quest.id} className={`border rounded-lg p-4 transition-all cursor-pointer ${
              quest.completed 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-200 hover:border-green-300 hover:shadow-md'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{quest.title}</h4>
                {quest.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
              <p className="text-sm text-gray-600 mb-3">{quest.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  quest.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {quest.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-green-600">
                  <Star className="w-4 h-4" />
                  <span className="font-semibold">{quest.xp} XP</span>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{quest.progress}/{quest.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              {quest.participants && (
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1 text-gray-600 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{quest.participants} participants</span>
                  </div>
                </div>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleQuestClick(quest)}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  disabled={quest.completed}
                >
                  {quest.completed ? 'Completed' : 'Continue'}
                </button>
                {quest.participants && !quest.completed && (
                  <button
                    onClick={() => handleJoinQuest(quest.id)}
                    className="px-3 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Class Leaderboard</h3>
        <div className="space-y-3">
          {leaderboardData.map((player) => (
            <div key={player.rank} className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
              player.name === user.name 
                ? 'bg-green-50 border-2 border-green-200 shadow-sm' 
                : 'hover:bg-gray-50 border border-gray-100'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                player.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                'bg-blue-100 text-blue-700'
              }`}>
                {player.rank}
              </div>
              <div className="text-3xl">{player.avatar}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{player.name}</p>
                <p className="text-sm text-gray-600">Level {player.level} • {player.xp} XP</p>
              </div>
              {player.rank <= 3 && (
                <Trophy className={`w-6 h-6 ${
                  player.rank === 1 ? 'text-yellow-500' :
                  player.rank === 2 ? 'text-gray-500' :
                  'text-orange-500'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Eco-Warrior Profile</h3>
        <div className="flex items-start space-x-6">
          <div className="text-8xl">{user.avatar}</div>
          <div className="flex-1">
            <h4 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h4>
            <p className="text-gray-600 mb-4">Level {user.level} Eco-Warrior</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress to Level {(user.level || 0) + 1}</span>
                  <span>{(user.xp || 0) % 200}/200 XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((user.xp || 0) % 200) / 200 * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Badge Collection</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {(user.badges || []).map((badge, index) => (
            <div key={index} className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center text-2xl border-2 border-yellow-200 hover:border-yellow-300 transition-colors hover:scale-105 transform">
              {badge}
            </div>
          ))}
          {Array.from({ length: Math.max(0, 12 - (user.badges?.length || 0)) }).map((_, index) => (
            <div key={`empty-${index}`} className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-200 opacity-50">
              ?
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Environmental Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-4xl font-bold text-green-600 mb-1">{Math.floor((user.xp || 0) / 100)}</div>
            <div className="text-sm text-gray-600">Trees Planted</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-4xl font-bold text-blue-600 mb-1">{Math.floor((user.xp || 0) / 10)}</div>
            <div className="text-sm text-gray-600">Bottles Recycled</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-4xl font-bold text-purple-600 mb-1">{Math.floor((user.xp || 0) / 5)}</div>
            <div className="text-sm text-gray-600">kWh Saved</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">All Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-100">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                {achievement.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{achievement.name}</p>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome back, {user.name}! 🌟</h1>
                <p className="text-sm text-gray-600">Level {user.level} Eco-Warrior</p>
              </div>
            </div>
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg mr-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            )}
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-2">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-gray-600 hover:bg-gray-100 mb-4 border-b border-gray-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-green-100 text-green-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('quests')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'quests'
                  ? 'bg-green-100 text-green-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Target className="w-5 h-5" />
              <span>Quests</span>
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-green-100 text-green-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span>Leaderboard</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-green-100 text-green-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Award className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'quests' && renderQuests()}
            {activeTab === 'leaderboard' && renderLeaderboard()}
            {activeTab === 'profile' && renderProfile()}
          </div>
        </div>
      </div>

      {/* Quest Modal */}
      {showVerificationModal && selectedQuest && (
        <QuestVerificationModal
          quest={selectedQuest}
          onClose={() => {
            setShowVerificationModal(false);
            setSelectedQuest(null);
          }}
          onSubmit={handleQuestSubmission}
        />
      )}
    </div>
  );
};

export default StudentDashboard;