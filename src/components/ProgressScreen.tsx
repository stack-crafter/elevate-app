import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Trophy, Target, Flame, Star, Award } from 'lucide-react';
import type { User, Language, Badge as BadgeType } from '../App';

interface ProgressScreenProps {
  user: User;
  languages: Language[];
  badges: BadgeType[];
}

export function ProgressScreen({ user, languages, badges }: ProgressScreenProps) {
  const earnedBadges = badges.filter(badge => badge.earned);
  const levelProgress = ((user.totalXp % 500) / 500) * 100;
  const nextLevelXp = (user.level * 500) + 500;
  const xpToNext = nextLevelXp - user.totalXp;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Your Progress</h1>
        <p className="text-gray-600">Track your learning journey and celebrate your achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl text-blue-900">Level {user.level}</div>
                <div className="text-sm text-blue-700">{xpToNext} XP to next level</div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={levelProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl text-orange-900">{user.streak} Days</div>
                <div className="text-sm text-orange-700">Current Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl text-green-900">{earnedBadges.length}</div>
                <div className="text-sm text-green-700">Badges Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl text-purple-900">{user.totalXp}</div>
                <div className="text-sm text-purple-700">Total XP</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Language Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Language Progress</span>
            </CardTitle>
            <CardDescription>Your progress across different programming languages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {languages.map((language) => (
              <div key={language.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${language.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-lg">{language.icon}</span>
                    </div>
                    <div>
                      <div className="text-gray-900">{language.name}</div>
                      <div className="text-sm text-gray-600">Programming Language</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900">{language.progress}%</div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>
                <Progress value={language.progress} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Badges Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span>Badges Collection</span>
            </CardTitle>
            <CardDescription>Your achievements and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    badge.earned
                      ? 'bg-white border-gray-200 shadow-sm hover:shadow-md'
                      : 'bg-gray-50 border-dashed border-gray-300 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 ${badge.earned ? badge.color : 'bg-gray-300'} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-2xl">{badge.icon}</span>
                    </div>
                    <div className={`text-sm mb-1 ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {badge.name}
                    </div>
                    <div className={`text-xs ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                      {badge.description}
                    </div>
                    {badge.earned && badge.earnedDate && (
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Earned {new Date(badge.earnedDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest learning activities and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Earned "Streak Master" badge</div>
                <div className="text-sm text-gray-600">Maintained a 7-day learning streak</div>
              </div>
              <div className="text-sm text-gray-500">2 days ago</div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white">🐍</span>
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Completed Python Functions lesson</div>
                <div className="text-sm text-gray-600">Gained 50 XP</div>
              </div>
              <div className="text-sm text-gray-500">3 days ago</div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white">☕</span>
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Started Java OOP module</div>
                <div className="text-sm text-gray-600">Object-Oriented Programming basics</div>
              </div>
              <div className="text-sm text-gray-500">5 days ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}