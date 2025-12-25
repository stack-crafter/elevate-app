import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Code, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import type { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onLanguageSelect: (languageId: string) => void;
}

export function HomeScreen({ onNavigate, onLanguageSelect }: HomeScreenProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-blue-700">Welcome back, Muhammad Moiz!</span>
        </div>
        <h1 className="text-4xl text-gray-900 mb-4">
          Ready to continue your coding journey?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose your path and level up your programming skills with interactive lessons and hands-on practice.
        </p>
      </div>

      {/* Main Action Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Code Editor Card */}
        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200"
              onClick={() => onNavigate('code-editor')}>
          <CardHeader className="pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Code className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Code Editor</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Write, test, and debug code in multiple programming languages with our integrated development environment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">☕</span>
                  <span className="text-sm text-gray-600">Java</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🐍</span>
                  <span className="text-sm text-gray-600">Python</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-sm text-gray-600">C++</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </CardContent>
        </Card>

        {/* Learning Track Card */}
        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200"
              onClick={() => onNavigate('learning-track')}>
          <CardHeader className="pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Learning Track</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Follow structured courses and earn badges while mastering programming fundamentals step by step.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🎯</span>
                  <span className="text-sm text-gray-600">Lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏆</span>
                  <span className="text-sm text-gray-600">Badges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📈</span>
                  <span className="text-sm text-gray-600">Progress</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
          <div className="text-2xl mb-1">12</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
          <div className="text-2xl mb-1">4</div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
          <div className="text-2xl mb-1">67%</div>
          <div className="text-sm text-gray-600">Avg Progress</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
          <div className="text-2xl mb-1">Level 7</div>
          <div className="text-sm text-gray-600">Current Level</div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="mt-16">
        <h2 className="text-2xl text-gray-900 mb-6 text-center">Continue Learning</h2>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onLanguageSelect('java')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">☕</span>
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">Java Basics</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">75% Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onLanguageSelect('python')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🐍</span>
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">Python Fundamentals</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">60% Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onLanguageSelect('html')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌐</span>
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">HTML & CSS</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-400 to-orange-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">90% Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}