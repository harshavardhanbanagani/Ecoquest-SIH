import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Target, Globe, BookOpen, Plus, Calendar, Award, Leaf, LogOut, Settings, TrendingUp, Edit, Trash2, Eye, CheckCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import type { User as UserType, Quest } from '../App';

interface TeacherDashboardProps {
  user: UserType;
  onLogout: () => void;
  onBackToHome?: () => void;
}

interface Student {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  avatar: string;
  lastActive: string;
  completedChallenges: number;
  streak: number;
}

interface ClassData {
  totalStudents: number;
  activeStudents: number;
  completedChallenges: number;
  totalImpact: {
    treesPlanted: number;
    plasticRecycled: number;
    energySaved: number;
  };
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onLogout, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'challenges' | 'analytics' | 'resources'>('overview');
  const [students, setStudents] = useState<Student[]>([]);
  const [challenges, setChallenges] = useState<Quest[]>([]);
  const [classData, setClassData] = useState<ClassData>({
    totalStudents: 28,
    activeStudents: 24,
    completedChallenges: 156,
    totalImpact: {
      treesPlanted: 47,
      plasticRecycled: 312,
      energySaved: 1250
    }
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    category: 'Waste',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    xp: 100,
    deadline: ''
  });

  useEffect(() => {
    // Initialize demo data
    const demoStudents: Student[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@school.edu',
        level: 18,
        xp: 3200,
        avatar: '🌟',
        lastActive: '2 hours ago',
        completedChallenges: 15,
        streak: 12
      },
      {
        id: '2',
        name: 'Mike Rodriguez',
        email: 'mike.r@school.edu',
        level: 16,
        xp: 2800,
        avatar: '🏆',
        lastActive: '4 hours ago',
        completedChallenges: 12,
        streak: 8
      },
      {
        id: '3',
        name: 'Alex Chen',
        email: 'alex.c@school.edu',
        level: 15,
        xp: 2450,
        avatar: '🌱',
        lastActive: '1 hour ago',
        completedChallenges: 11,
        streak: 7
      },
      {
        id: '4',
        name: 'Emma Wilson',
        email: 'emma.w@school.edu',
        level: 14,
        xp: 2100,
        avatar: '🌿',
        lastActive: '6 hours ago',
        completedChallenges: 9,
        streak: 5
      },
      {
        id: '5',
        name: 'David Kim',
        email: 'david.k@school.edu',
        level: 13,
        xp: 1950,
        avatar: '⚡',
        lastActive: '1 day ago',
        completedChallenges: 8,
        streak: 3
      }
    ];

    const demoChallenges: Quest[] = [
      {
        id: '1',
        title: 'Campus Biodiversity Survey',
        description: 'Document and catalog local flora and fauna on campus',
        progress: 60,
        total: 100,
        xp: 300,
        difficulty: 'Hard',
        category: 'Research',
        completed: false,
        deadline: '2024-02-15',
        participants: 15
      },
      {
        id: '2',
        title: 'Plastic-Free February',
        description: 'Eliminate single-use plastics for the entire month',
        progress: 45,
        total: 100,
        xp: 250,
        difficulty: 'Medium',
        category: 'Lifestyle',
        completed: false,
        deadline: '2024-02-28',
        participants: 22
      },
      {
        id: '3',
        title: 'Solar Panel Workshop',
        description: 'Learn about and install a small solar panel system',
        progress: 25,
        total: 100,
        xp: 400,
        difficulty: 'Hard',
        category: 'Technology',
        completed: false,
        deadline: '2024-02-20',
        participants: 8
      }
    ];

    setStudents(demoStudents);
    setChallenges(demoChallenges);
  }, []);

  const recentActivities = [
    { student: 'Ananya Patel', action: 'Completed "No-Plastic Week"', time: '2 hours ago', type: 'success' },
    { student: 'Rohan Verma', action: 'Planted a sapling', time: '4 hours ago', type: 'success' },
    { student: 'Arjun Sharma', action: 'Submitted energy audit', time: '6 hours ago', type: 'pending' },
    { student: 'Kavya Singh', action: 'Joined cleanup drive', time: '1 day ago', type: 'info' }
  ];

  const handleCreateChallenge = () => {
    if (newChallenge.title && newChallenge.description) {
      const challenge: Quest = {
        id: Date.now().toString(),
        title: newChallenge.title,
        description: newChallenge.description,
        progress: 0,
        total: 100,
        xp: newChallenge.xp,
        difficulty: newChallenge.difficulty,
        category: newChallenge.category,
        completed: false,
        deadline: newChallenge.deadline,
        participants: 0
      };

      setChallenges(prev => [challenge, ...prev]);
      setShowCreateModal(false);
      setNewChallenge({
        title: '',
        description: '',
        category: 'Waste',
        difficulty: 'Medium',
        xp: 100,
        deadline: ''
      });
      alert('Challenge created successfully! 🎉');
    }
  };

  const handleDeleteChallenge = (challengeId: string) => {
    if (confirm('Are you sure you want to delete this challenge?')) {
      setChallenges(prev => prev.filter(c => c.id !== challengeId));
      alert('Challenge deleted successfully!');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-green-600">{classData.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">{classData.activeStudents} active</span>
            <span className="text-gray-500 ml-2">this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Challenges</p>
              <p className="text-3xl font-bold text-blue-600">{classData.completedChallenges}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-blue-600 font-medium">+12</span>
            <span className="text-gray-500 ml-2">this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trees Planted</p>
              <p className="text-3xl font-bold text-purple-600">{classData.totalImpact.treesPlanted}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-purple-600 font-medium">+3</span>
            <span className="text-gray-500 ml-2">this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Energy Saved</p>
              <p className="text-3xl font-bold text-orange-600">{classData.totalImpact.energySaved}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-orange-600 font-medium">kWh saved</span>
            <span className="text-gray-500 ml-2">total</span>
          </div>
        </div>
      </div>

      {/* Top Students and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-3">
            {students.slice(0, 5).map((student, index) => (
              <div key={student.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-700' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {index + 1}
                </div>
                <div className="text-2xl">{student.avatar}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600">Level {student.level} • {student.xp} XP</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{student.completedChallenges} challenges</p>
                  <p className="text-xs text-gray-500">{student.streak} day streak</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'pending' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.student}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                {activity.type === 'pending' && (
                  <Clock className="w-4 h-4 text-yellow-500" />
                )}
                {activity.type === 'success' && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Active Challenges</h3>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create Challenge</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {challenges.slice(0, 3).map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {challenge.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{challenge.participants}</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{challenge.description}</p>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
              </div>
              {challenge.deadline && (
                <div className="flex items-center space-x-1 text-orange-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {challenge.deadline}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Student Progress</h3>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Students</option>
              <option>Active This Week</option>
              <option>Top Performers</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">XP</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Challenges</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Streak</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Active</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{student.avatar}</div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {student.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{student.xp}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {student.completedChallenges} completed
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{student.streak}</span>
                      <span className="text-sm text-gray-600">days</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">{student.lastActive}</td>
                  <td className="py-3 px-4">
                    <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Challenge Management</h3>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Challenge</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {challenge.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-medium ml-1">{challenge.participants}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium ml-1">{challenge.progress}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">XP Reward:</span>
                      <span className="font-medium ml-1">{challenge.xp}</span>
                    </div>
                    {challenge.deadline && (
                      <div>
                        <span className="text-gray-600">Deadline:</span>
                        <span className="font-medium ml-1">{challenge.deadline}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteChallenge(challenge.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Environmental Impact Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
            <div className="text-4xl font-bold text-green-600 mb-2">{classData.totalImpact.treesPlanted}</div>
            <div className="text-green-700 font-medium mb-1">Trees Planted</div>
            <div className="text-sm text-green-600">~{classData.totalImpact.treesPlanted * 22}kg CO₂ absorbed/year</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">{classData.totalImpact.plasticRecycled}</div>
            <div className="text-blue-700 font-medium mb-1">Plastic Bottles Recycled</div>
            <div className="text-sm text-blue-600">~{Math.floor(classData.totalImpact.plasticRecycled * 0.8)}kg plastic saved</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
            <div className="text-4xl font-bold text-purple-600 mb-2">{classData.totalImpact.energySaved}</div>
            <div className="text-purple-700 font-medium mb-1">kWh Energy Saved</div>
            <div className="text-sm text-purple-600">~{Math.floor(classData.totalImpact.energySaved * 0.4)}kg CO₂ reduced</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Challenge Completion</h3>
          <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center border border-green-100">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-gray-600">Interactive chart would be implemented here</p>
              <p className="text-sm text-gray-500">Showing completion trends over time</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Category Performance</h3>
          <div className="space-y-4">
            {[
              { category: 'Waste Management', completion: 85, color: 'green' },
              { category: 'Energy Conservation', completion: 72, color: 'blue' },
              { category: 'Water Conservation', completion: 68, color: 'purple' },
              { category: 'Biodiversity', completion: 45, color: 'orange' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">{item.category}</span>
                  <span className="text-gray-600">{item.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      item.color === 'green' ? 'from-green-500 to-emerald-600' :
                      item.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      item.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      'from-orange-500 to-orange-600'
                    }`}
                    style={{ width: `${item.completion}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Educational Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Climate Change Basics', type: 'PDF', downloads: 45, category: 'Climate' },
            { title: 'Waste Segregation Guide', type: 'Video', downloads: 67, category: 'Waste' },
            { title: 'Energy Audit Checklist', type: 'PDF', downloads: 32, category: 'Energy' },
            { title: 'Biodiversity Survey Kit', type: 'PDF', downloads: 28, category: 'Biodiversity' },
            { title: 'Water Conservation Tips', type: 'Infographic', downloads: 54, category: 'Water' },
            { title: 'Sustainable Living Workshop', type: 'Video', downloads: 89, category: 'Lifestyle' }
          ].map((resource, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  resource.type === 'PDF' ? 'bg-red-100 text-red-700' :
                  resource.type === 'Video' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {resource.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{resource.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                  Share
                </button>
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
                <h1 className="text-xl font-bold text-gray-900">Teacher Dashboard</h1>
                <p className="text-sm text-gray-600">Environmental Science - Grade 10A</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              )}
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
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
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-green-100 text-green-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'students'
                  ? 'bg-green-100 text-green-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Students</span>
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'challenges'
                  ? 'bg-green-100 text-green-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Target className="w-5 h-5" />
              <span>Challenges</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'analytics'
                  ? 'bg-green-100 text-green-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'resources'
                  ? 'bg-green-100 text-green-700 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Resources</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'students' && renderStudents()}
            {activeTab === 'challenges' && renderChallenges()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'resources' && renderResources()}
          </div>
        </div>
      </div>

      {/* Create Challenge Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Challenges</span>
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Challenge</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter challenge title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) => setNewChallenge(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="Describe the challenge"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newChallenge.category}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Waste">Waste</option>
                    <option value="Energy">Energy</option>
                    <option value="Water">Water</option>
                    <option value="Biodiversity">Biodiversity</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={newChallenge.difficulty}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">XP Reward</label>
                  <input
                    type="number"
                    value={newChallenge.xp}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, xp: parseInt(e.target.value) || 100 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="50"
                    max="500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (Optional)</label>
                  <input
                    type="date"
                    value={newChallenge.deadline}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChallenge}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;