import React from 'react';
import { Luggage } from 'lucide-react';
import { Auth } from './Auth';

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Luggage className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground font-headline tracking-wider">
            Kneeboard
          </h1>
        </div>
        <Auth />
      </div>
      {children && <div className="container mx-auto">{children}</div>}
    </header>
  );
}
