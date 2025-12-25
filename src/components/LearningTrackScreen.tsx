import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, Play, CheckCircle, Clock } from 'lucide-react';
import type { Language } from '../App';

interface LearningTrackScreenProps {
  languages: Language[];
  selectedLanguage: string | null;
  onModuleSelect: (moduleId: string) => void;
  onBack: () => void;
}

// Mock modules for each language
const mockModules = {
  java: [
    { id: 'java-1', name: 'Java Basics', lessons: 8, completed: 8, progress: 100, difficulty: 'Beginner' },
    { id: 'java-2', name: 'Object-Oriented Programming', lessons: 12, completed: 9, progress: 75, difficulty: 'Intermediate' },
    { id: 'java-3', name: 'Data Structures', lessons: 10, completed: 3, progress: 30, difficulty: 'Intermediate' },
    { id: 'java-4', name: 'Advanced Topics', lessons: 15, completed: 0, progress: 0, difficulty: 'Advanced' }
  ],
  python: [
    { id: 'python-1', name: 'Python Fundamentals', lessons: 10, completed: 6, progress: 60, difficulty: 'Beginner' },
    { id: 'python-2', name: 'Data Analysis', lessons: 8, completed: 0, progress: 0, difficulty: 'Intermediate' },
    { id: 'python-3', name: 'Web Development', lessons: 12, completed: 0, progress: 0, difficulty: 'Intermediate' },
    { id: 'python-4', name: 'Machine Learning', lessons: 16, completed: 0, progress: 0, difficulty: 'Advanced' }
  ],
  cpp: [
    { id: 'cpp-1', name: 'C++ Basics', lessons: 9, completed: 4, progress: 45, difficulty: 'Beginner' },
    { id: 'cpp-2', name: 'Memory Management', lessons: 8, completed: 0, progress: 0, difficulty: 'Intermediate' },
    { id: 'cpp-3', name: 'STL & Algorithms', lessons: 14, completed: 0, progress: 0, difficulty: 'Advanced' }
  ],
  c: [
    { id: 'c-1', name: 'C Programming Basics', lessons: 8, completed: 2, progress: 25, difficulty: 'Beginner' },
    { id: 'c-2', name: 'Pointers & Arrays', lessons: 10, completed: 0, progress: 0, difficulty: 'Intermediate' },
    { id: 'c-3', name: 'System Programming', lessons: 12, completed: 0, progress: 0, difficulty: 'Advanced' }
  ],
  html: [
    { id: 'html-1', name: 'HTML Fundamentals', lessons: 6, completed: 6, progress: 100, difficulty: 'Beginner' },
    { id: 'html-2', name: 'CSS Styling', lessons: 8, completed: 7, progress: 88, difficulty: 'Beginner' },
    { id: 'html-3', name: 'Responsive Design', lessons: 10, completed: 5, progress: 50, difficulty: 'Intermediate' },
    { id: 'html-4', name: 'JavaScript Basics', lessons: 12, completed: 0, progress: 0, difficulty: 'Intermediate' }
  ]
};

export function LearningTrackScreen({ languages, selectedLanguage, onModuleSelect, onBack }: LearningTrackScreenProps) {
  if (selectedLanguage) {
    const language = languages.find(lang => lang.id === selectedLanguage);
    const modules = mockModules[selectedLanguage as keyof typeof mockModules] || [];
    
    if (!language) return null;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Languages
          </Button>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${language.color} rounded-xl flex items-center justify-center`}>
              <span className="text-2xl">{language.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl text-gray-900">{language.name} Learning Track</h1>
              <p className="text-gray-600">Master {language.name} programming step by step</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-gray-900">Overall Progress</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {language.progress}% Complete
              </Badge>
            </div>
            <Progress value={language.progress} className="h-3 mb-4" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl text-blue-600">{modules.filter(m => m.progress === 100).length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl text-orange-600">{modules.filter(m => m.progress > 0 && m.progress < 100).length}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div>
                <div className="text-2xl text-gray-600">{modules.filter(m => m.progress === 0).length}</div>
                <div className="text-sm text-gray-600">Not Started</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl text-gray-900 mb-6">Learning Modules</h2>
          {modules.map((module, index) => {
            const isLocked = index > 0 && modules[index - 1].progress < 100;
            
            return (
              <Card 
                key={module.id} 
                className={`transition-all duration-300 ${
                  isLocked 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:shadow-lg cursor-pointer'
                }`}
                onClick={() => !isLocked && onModuleSelect(module.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        module.progress === 100 
                          ? 'bg-green-500' 
                          : module.progress > 0 
                            ? 'bg-blue-500' 
                            : isLocked 
                              ? 'bg-gray-300' 
                              : 'bg-gray-400'
                      }`}>
                        {module.progress === 100 ? (
                          <CheckCircle className="w-8 h-8 text-white" />
                        ) : module.progress > 0 ? (
                          <Play className="w-8 h-8 text-white" />
                        ) : isLocked ? (
                          <Clock className="w-8 h-8 text-gray-500" />
                        ) : (
                          <BookOpen className="w-8 h-8 text-white" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-lg ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>
                            {module.name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              module.difficulty === 'Beginner' ? 'border-green-300 text-green-700' :
                              module.difficulty === 'Intermediate' ? 'border-yellow-300 text-yellow-700' :
                              'border-red-300 text-red-700'
                            }`}
                          >
                            {module.difficulty}
                          </Badge>
                        </div>
                        <div className={`text-sm mb-3 ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {module.completed} of {module.lessons} lessons completed
                        </div>
                        <div className="w-full">
                          <Progress value={module.progress} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className={`text-2xl mb-2 ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                        {module.progress}%
                      </div>
                      {isLocked ? (
                        <Badge variant="outline" className="border-gray-300 text-gray-500">
                          Locked
                        </Badge>
                      ) : module.progress === 100 ? (
                        <Badge className="bg-green-500 text-white">
                          Complete
                        </Badge>
                      ) : module.progress > 0 ? (
                        <Badge className="bg-blue-500 text-white">
                          Continue
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          Start
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Language selection view
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl text-gray-900 mb-4">Choose Your Learning Path</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select a programming language to start your structured learning journey
        </p>
      </div>

      {/* Languages Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((language) => (
          <Card 
            key={language.id} 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => onModuleSelect(language.id)}
          >
            <CardHeader className="pb-4">
              <div className={`w-20 h-20 bg-gradient-to-r ${language.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                <span className="text-3xl">{language.icon}</span>
              </div>
              <CardTitle className="text-center text-2xl text-gray-900">{language.name}</CardTitle>
              <CardDescription className="text-center">
                Master {language.name} programming from basics to advanced concepts
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <div className="text-3xl text-gray-900 mb-1">{language.progress}%</div>
                <div className="text-sm text-gray-600 mb-3">Complete</div>
                <Progress value={language.progress} className="h-3" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg text-blue-600">
                    {mockModules[language.id as keyof typeof mockModules]?.filter(m => m.progress === 100).length || 0}
                  </div>
                  <div className="text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg text-gray-900">
                    {mockModules[language.id as keyof typeof mockModules]?.length || 0}
                  </div>
                  <div className="text-gray-600">Total Modules</div>
                </div>
              </div>
              
              <Button className="w-full mt-6 group-hover:bg-opacity-90" size="lg">
                {language.progress > 0 ? 'Continue Learning' : 'Start Learning'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}