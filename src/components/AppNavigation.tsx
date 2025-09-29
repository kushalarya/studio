'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DestinationList } from '@/components/DestinationList';
import { MyChecklistPage } from '@/components/MyChecklistPage';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Header from './Header';

type Tab = 'explore' | 'checklist';

export default function AppNavigation() {
  const [activeTab, setActiveTab] = useState<Tab>('explore');

  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return <DestinationList />;
      case 'checklist':
        return <MyChecklistPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header>
        <div className="flex">
          <TabButton
            label="Explore"
            isActive={activeTab === 'explore'}
            onClick={() => setActiveTab('explore')}
          />
          <TabButton
            label="Checklist"
            isActive={activeTab === 'checklist'}
            onClick={() => setActiveTab('checklist')}
          />
        </div>
      </Header>
      <div className="mt-4 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
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
