'use client';

import { Button } from '@/components/ui/button';
import { Settings, BarChart3 } from 'lucide-react';
import { useTypingStore } from '@/lib/typing-store';

interface HeaderProps {
  onSettingsClick: () => void;
  onStatsClick: () => void;
}

export function Header({ onSettingsClick, onStatsClick }: HeaderProps) {
  const { theme } = useTypingStore();

  return (
    <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <h1 className="text-xl font-bold text-gray-100">Typemaster</h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button
            onClick={onStatsClick}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-100"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Stats
          </Button>
          <Button
            onClick={onSettingsClick}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-100"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
}
