'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DestinationList } from '@/components/DestinationList';
import { MyChecklistPage } from '@/components/MyChecklistPage';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Luggage } from 'lucide-react';
import { Auth } from './Auth';

type Tab = 'explore' | 'checklist';

export default function AppNavigation() {
  const [activeTab, setActiveTab] = useState<Tab>('explore');

  return (
    <>
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Luggage className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline tracking-wider">
              TripEase
            </h1>
          </div>
          <Auth />
        </div>
        <div className="container mx-auto">
          <div className="flex">
            <TabButton
              label="Explore"
              isActive={activeTab === 'explore'}
              onClick={() => setActiveTab('explore')}
            />
            <TabButton
              label="My checklist"
              isActive={active-tab === 'checklist'}
              onClick={() => setActiveTab('checklist')}
            />
          </div>
        </div>
      </header>
      <div className="mt-4 flex-1">
        {activeTab === 'explore' && <DestinationList />}
        {activeTab === 'checklist' && <MyChecklistPage />}
      </div>
    </>
  );
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'relative rounded-none px-6 py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
        { 'text-foreground': isActive }
      )}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="active-tab-indicator"
          className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"
        />
      )}
    </Button>
  );
}
