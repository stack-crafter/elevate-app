import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { User, Mail, Phone, Settings, LogOut, Award, BookOpen, CheckCircle } from 'lucide-react';
import type { User as UserType, Language, Badge as BadgeType } from '../App';

interface ProfileScreenProps {
  user: UserType;
  languages: Language[];
  badges: BadgeType[];
}

export function ProfileScreen({ user, languages, badges }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const earnedBadges = badges.filter(badge => badge.earned);
  const completedModules = languages.filter(lang => lang.progress === 100);
  const totalModules = languages.length;
  const overallProgress = Math.round(languages.reduce((sum, lang) => sum + lang.progress, 0) / languages.length);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and view your learning achievements</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Personal Information</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">Level {user.level} Developer</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {user.totalXp} XP
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {user.streak} day streak
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="text-gray-900">{user.email}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="text-gray-900">{user.phone}</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="flex-1">
                  <LogOut className="w-4 h-4 mr-2" />
                  Switch Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Completed Modules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                <span>Learning Progress</span>
              </CardTitle>
              <CardDescription>
                Your progress across all learning modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="text-green-900">Overall Progress</div>
                      <div className="text-sm text-green-700">{completedModules.length} of {totalModules} languages mastered</div>
                    </div>
                  </div>
                  <div className="text-2xl text-green-900">{overallProgress}%</div>
                </div>

                <div className="space-y-3">
                  {languages.map((language) => (
                    <div key={language.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${language.color} rounded-lg flex items-center justify-center`}>
                          <span className="text-sm">{language.icon}</span>
                        </div>
                        <div>
                          <div className="text-gray-900">{language.name}</div>
                          <div className="text-sm text-gray-600">
                            {language.progress === 100 ? 'Completed' : 'In Progress'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-gray-900">{language.progress}%</div>
                        {language.progress === 100 && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievement Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="text-3xl text-yellow-600 mb-2">🏆</div>
                  <div className="text-lg text-gray-900">{earnedBadges.length}</div>
                  <div className="text-sm text-gray-600">Badges Earned</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {earnedBadges.slice(0, 4).map((badge) => (
                    <div key={badge.id} className="text-center p-3 bg-white border rounded-lg">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs text-gray-600 truncate">{badge.name}</div>
                    </div>
                  ))}
                </div>

                {earnedBadges.length > 4 && (
                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      View All Badges
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Level</span>
                <Badge variant="secondary">{user.level}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total XP</span>
                <Badge variant="secondary">{user.totalXp}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Learning Streak</span>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {user.streak} days
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Languages</span>
                <Badge variant="secondary">{languages.length}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {earnedBadges.slice(0, 3).map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 ${badge.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-sm">{badge.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 truncate">{badge.name}</div>
                      <div className="text-xs text-gray-600">
                        {badge.earnedDate && new Date(badge.earnedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}