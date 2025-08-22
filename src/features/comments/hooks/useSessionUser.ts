import {useState, useEffect} from 'react';
import {getSessionUser} from '../../../services/userSessionService';

export type SessionUser = {
    username: string;
    avatar: string;
} | null;

export function useSessionUser() {
    const [currentUser, setCurrentUser] = useState<SessionUser>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = getSessionUser();
        setCurrentUser(user);
        setIsLoading(false);
    }, []);

    return {currentUser, isLoading};
}
