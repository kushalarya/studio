'use client';

import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
              <AvatarFallback>
                {user.displayName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.displayName}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">User Information</h3>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>UID:</strong> {user.uid}
              </p>
              <p>
                <strong>Last sign-in:</strong>{' '}
                {new Date(user.metadata.lastSignInTime!).toLocaleString()}
              </p>
            </div>
          </div>

          <Button variant="destructive" onClick={logout} className="w-full">
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
