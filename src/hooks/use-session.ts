import { useState } from 'react';

const localStorageKey = '__session__';

type Session = {
  id: string;
  name: string;
};

function getParsedSession(): Session | null {
  let session = localStorage.getItem(localStorageKey);
  if (session) return JSON.parse(session) as Session;
  return null;
}

function useSession() {
  const [session, setSession] = useState<Session | null>(getParsedSession());

  const updateSession = (s: Session) => {
    localStorage.setItem(localStorageKey, JSON.stringify(s));
    setSession(s);
  };

  return [session, updateSession];
}

export default useSession;
