import { Luggage } from 'lucide-react';
import { Auth } from './Auth';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Luggage className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground font-headline tracking-wider">
            Kneeboard
          </h1>
        </div>
        <Auth />
      </div>
    </header>
  );
}
