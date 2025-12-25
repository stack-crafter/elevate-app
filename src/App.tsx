import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LearningTrackScreen } from './components/LearningTrackScreen';
import { LessonScreen } from './components/LessonScreen';
import { CodeEditorScreen } from './components/CodeEditorScreen';

export type Screen = 'home' | 'progress' | 'profile' | 'learning-track' | 'lesson' | 'code-editor';

export interface User {
  name: string;
  email: string;
  phone: string;
  level: number;
  streak: number;
  totalXp: number;
}

export interface Language {
  id: string;
  name: string;
  icon: string;
  progress: number;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earnedDate?: string;
}

export interface Lesson {
  id: string;
  title: string;
  goal: string;
  content: string;
  completed: boolean;
}

export interface Module {
  id: string;
  languageId: string;
  name: string;
  lessons: Lesson[];
  progress: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  // Mock user data
  const user: User = {
    name: "Muhammad Moiz",
    email: "engmoiz@gmail.com", 
    phone: "+92 3081719927",
    level: 7,
    streak: 12,
    totalXp: 2450
  };

  // Mock languages data
  const languages: Language[] = [
    { id: 'java', name: 'Java', icon: '☕', progress: 75, color: 'from-orange-400 to-red-500' },
    { id: 'python', name: 'Python', icon: '🐍', progress: 60, color: 'from-blue-400 to-green-500' },
    { id: 'cpp', name: 'C++', icon: '⚡', progress: 45, color: 'from-purple-400 to-blue-500' },
    { id: 'c', name: 'C', icon: '🔧', progress: 30, color: 'from-gray-400 to-blue-400' },
    { id: 'html', name: 'HTML', icon: '🌐', progress: 90, color: 'from-pink-400 to-orange-500' }
  ];

  // Mock badges data
  const badges: Badge[] = [
    { id: '1', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', color: 'bg-blue-500', earned: true, earnedDate: '2024-01-15' },
    { id: '2', name: 'Code Warrior', description: 'Complete 10 lessons', icon: '⚔️', color: 'bg-purple-500', earned: true, earnedDate: '2024-01-20' },
    { id: '3', name: 'Python Master', description: 'Complete Python basics', icon: '🐍', color: 'bg-green-500', earned: true, earnedDate: '2024-02-01' },
    { id: '4', name: 'Streak Master', description: 'Maintain 7-day streak', icon: '🔥', color: 'bg-orange-500', earned: true, earnedDate: '2024-02-10' },
    { id: '5', name: 'Problem Solver', description: 'Solve 50 challenges', icon: '🧩', color: 'bg-indigo-500', earned: false },
    { id: '6', name: 'Java Expert', description: 'Master Java fundamentals', icon: '☕', color: 'bg-yellow-500', earned: false }
  ];

  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
    setCurrentScreen('learning-track');
  };

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
    setSelectedLesson('1'); // Start with first lesson
    setCurrentScreen('lesson');
  };

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLesson(lessonId);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigation} onLanguageSelect={handleLanguageSelect} />;
      case 'progress':
        return <ProgressScreen user={user} languages={languages} badges={badges} />;
      case 'profile':
        return <ProfileScreen user={user} languages={languages} badges={badges} />;
      case 'learning-track':
        return <LearningTrackScreen 
          languages={languages} 
          selectedLanguage={selectedLanguage}
          onModuleSelect={handleModuleSelect}
          onBack={() => setCurrentScreen('home')}
        />;
      case 'lesson':
        return <LessonScreen 
          selectedLanguage={selectedLanguage}
          selectedModule={selectedModule}
          selectedLesson={selectedLesson}
          onLessonSelect={handleLessonSelect}
          onBack={() => setCurrentScreen('learning-track')}
        />;
      case 'code-editor':
        return <CodeEditorScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onNavigate={handleNavigation} onLanguageSelect={handleLanguageSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar 
        currentScreen={currentScreen} 
        onNavigate={handleNavigation} 
        user={user}
      />
      <main className="pt-16">
        {renderScreen()}
      </main>
    </div>
  );
}