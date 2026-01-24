import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Play, BookOpen, Target, Zap, TrendingUp } from 'lucide-react'
import '@/styles/f1-modern.css'

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: 'Strategy' | 'Mechanics' | 'Data' | 'Tactics'
  completed: boolean
}

export default function AcademyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null)

  // Mock academy data
  const mockLessons: Lesson[] = [
    {
      id: 'lesson-1',
      title: 'Understanding F1 Race Strategy',
      description: 'Learn the fundamentals of race strategy, including tire management, fuel consumption, and optimal pit stop timing.',
      duration: '12 min',
      difficulty: 'Beginner',
      category: 'Strategy',
      completed: true,
    },
    {
      id: 'lesson-2',
      title: 'Pit Stop Mechanics & Timing',
      description: 'Deep dive into pit stop execution, crew coordination, and how to optimize pit stop time.',
      duration: '15 min',
      difficulty: 'Intermediate',
      category: 'Mechanics',
      completed: true,
    },
    {
      id: 'lesson-3',
      title: 'Tire Degradation Analysis',
      description: 'Understand tire compounds, degradation curves, and how to predict tire performance throughout a race.',
      duration: '18 min',
      difficulty: 'Intermediate',
      category: 'Data',
      completed: false,
    },
    {
      id: 'lesson-4',
      title: 'Weather Impact on Strategy',
      description: 'Analyze how weather conditions affect race strategy, fuel consumption, and tire wear.',
      duration: '14 min',
      difficulty: 'Intermediate',
      category: 'Strategy',
      completed: false,
    },
    {
      id: 'lesson-5',
      title: 'Defensive & Offensive Tactics',
      description: 'Learn tactical approaches to defending positions and executing overtaking maneuvers.',
      duration: '16 min',
      difficulty: 'Advanced',
      category: 'Tactics',
      completed: false,
    },
    {
      id: 'lesson-6',
      title: 'Race Analysis with Telemetry',
      description: 'Master telemetry interpretation to understand driver performance and car setup variations.',
      duration: '20 min',
      difficulty: 'Advanced',
      category: 'Data',
      completed: false,
    },
  ]

  const categories = ['all', 'Strategy', 'Mechanics', 'Data', 'Tactics']

  const filteredLessons = selectedCategory === 'all'
    ? mockLessons
    : mockLessons.filter((lesson) => lesson.category === selectedCategory)

  const completedCount = mockLessons.filter((l) => l.completed).length
  const completionPercentage = Math.round((completedCount / mockLessons.length) * 100)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400'
      case 'Intermediate':
        return 'text-yellow-400'
      case 'Advanced':
        return 'text-f1-red'
      default:
        return 'text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strategy':
        return <Target className="w-5 h-5" />
      case 'Mechanics':
        return <Zap className="w-5 h-5" />
      case 'Data':
        return <TrendingUp className="w-5 h-5" />
      case 'Tactics':
        return <Zap className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-f1-dark text-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-f1-dark to-f1-dark-hover border-b border-f1-dark-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold mb-2">F1 Academy</h1>
            <p className="text-f1-cyan text-lg">Master F1 Strategy & Race Analysis</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Progress Card */}
          <div className="bg-f1-dark-hover border border-f1-dark-border rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Progress */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-f1-cyan mb-2">{completionPercentage}%</div>
                <p className="text-gray-400">Overall Progress</p>
                <div className="w-full h-2 bg-f1-dark rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-f1-cyan transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Lessons Completed */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-green-400 mb-2">{completedCount}</div>
                <p className="text-gray-400">Lessons Completed</p>
                <p className="text-sm text-gray-500 mt-2">Out of {mockLessons.length} lessons</p>
              </div>

              {/* Streak */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-f1-red mb-2">7</div>
                <p className="text-gray-400">Day Streak</p>
                <p className="text-sm text-gray-500 mt-2">Keep it up! 🔥</p>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-f1-cyan">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? 'bg-f1-red text-white'
                      : 'bg-f1-dark-hover hover:bg-f1-dark-border text-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-f1-cyan">
              {selectedCategory === 'all' ? 'All Lessons' : `${selectedCategory} Lessons`}
            </h2>

            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-f1-dark-hover border border-f1-dark-border rounded-lg overflow-hidden hover:border-f1-cyan transition"
              >
                {/* Lesson Header */}
                <div
                  onClick={() =>
                    setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)
                  }
                  className="p-6 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Completion Indicator */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        lesson.completed
                          ? 'bg-green-400 border-green-400'
                          : 'border-gray-600'
                      }`}
                    >
                      {lesson.completed && <div className="text-white text-sm">✓</div>}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gray-400">
                          {getCategoryIcon(lesson.category)}
                        </span>
                        <h3 className="text-lg font-bold">{lesson.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{lesson.duration}</span>
                        <span className={getDifficultyColor(lesson.difficulty)}>
                          {lesson.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <button className="p-2 hover:bg-f1-dark rounded transition ml-4">
                    <Play className="w-5 h-5 text-f1-cyan" />
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedLesson === lesson.id && (
                  <div className="px-6 pb-6 border-t border-f1-dark-border">
                    <p className="text-gray-300 mb-4">{lesson.description}</p>
                    <button className="w-full bg-f1-red hover:bg-f1-red-dark text-white font-bold py-2 px-4 rounded transition">
                      Start Lesson
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
