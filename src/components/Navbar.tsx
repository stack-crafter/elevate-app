import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Home, TrendingUp, User, Flame } from 'lucide-react';
import type { User as UserType, Screen } from '../App';
import logo from '../assets/headerlogo.png';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  user: UserType;
}

export function Navbar({ currentScreen, onNavigate, user }: NavbarProps) {
  const levelProgress = ((user.totalXp % 500) / 500) * 100; // Each level = 500 XP

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Navigation */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-2 mr-8">
  {/* Logo container */}
  <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
     <img
    src={logo}
    alt="Logo"
    className="max-w-full max-h-full object-contain"
  />
  </div>

  {/* Brand name */}
  <span className="text-xl font-semibold text-gray-900">Elevate</span>
</div>


            <Button
              variant={currentScreen === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>

            <Button
              variant={currentScreen === 'progress' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('progress')}
              className="flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Progress</span>
            </Button>

            <Button
              variant={currentScreen === 'profile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('profile')}
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Button>
          </div>

          {/* Right side - Streak and Level */}
          <div className="flex items-center space-x-6">
            {/* Streak Indicator */}
            <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-orange-700">{user.streak}</span>
            </div>

            {/* Level Indicator */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm text-gray-600">Level {user.level}</div>
                <div className="w-24">
                  <Progress value={levelProgress} className="h-2" />
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 border-purple-200"
              >
                {user.totalXp} XP
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
