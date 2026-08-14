'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Settings, BarChart3, Users } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  onStatsClick: () => void;
  onMultiplayerClick: () => void;
}

export function Header({ onSettingsClick, onStatsClick, onMultiplayerClick }: HeaderProps) {
  return (
    <header className="border-b-[3px] border-black bg-[#c8ff00] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black flex items-center justify-center shadow-[3px_3px_0_0_#fff]">
            <span className="text-yellow-300 font-bold text-xl leading-none">T</span>
          </div>
          <div className="leading-none">
            <h1 className="text-2xl font-bold text-black tracking-tight uppercase">
              TypeWithMe
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-black/70">
              KEYBOARD ACCELERATOR
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            onClick={onStatsClick}
            variant="outline"
            size="sm"
            className="bg-white"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Stats
          </Button>
          <Button
            onClick={onSettingsClick}
            variant="secondary"
            size="sm"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>

          <Button
            onClick={onMultiplayerClick}
            variant="secondary"
            size="sm"
          >
            <Users className="w-4 h-4 mr-1" />
            Multiplayer
          </Button>
        </div>
      </div>
    </header>
  );
}