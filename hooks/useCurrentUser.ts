import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const supabase = createClient();

interface UseCurrentUserReturn {
  userId: string | null;
  user: {
    id: string;
    name: string;
    avatar: string;
  } | null;
  isLoading: boolean;
}

export const useCurrentUser = (): UseCurrentUserReturn => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    avatar: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
      setUser({
        id: session?.user?.id || '',
        name: session?.user?.user_metadata?.full_name || '',
        avatar: session?.user?.user_metadata?.avatar_url || '',
      });
      setIsLoading(false);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { userId, user, isLoading };
};
