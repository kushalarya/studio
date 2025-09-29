'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DestinationList } from '@/components/DestinationList';
import ChecklistGenerator from '@/components/ChecklistGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Tab = 'home' | 'plan';

export default function AppNavigation() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DestinationList />;
      case 'plan':
        return <ChecklistGenerator />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="border-b border-border">
        <div className="container mx-auto flex">
          <TabButton
            label="Home"
            isActive={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <TabButton
            label="Plan my trip"
            isActive={activeTab === 'plan'}
            onClick={() => setActiveTab('plan')}
          />
        </div>
      </div>
      <div className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
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
