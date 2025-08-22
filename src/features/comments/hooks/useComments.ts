import {useState, useEffect} from 'react';
import {getAllComments} from '../../../services/commentsService';
import {commentChannel} from '../../../services/broadcastService';
import type {Comment, CommentBroadcastMessage} from '../types/comment';

export function useComments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadComments = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const loadedComments = await getAllComments();
            setComments(loadedComments);
        } catch (error) {
            setError('Failed to load comments. Please try again.');
            console.error('Failed to load comments:', error);
        } finally {
            setIsLoading(false);
            setTimeout(() => setIsUpdating(false), 1000);
        }
    };

    useEffect(() => {
        loadComments();
    }, []);

    useEffect(() => {
        if (!commentChannel) {
            return;
        }

        const handleMessage = (
            event: MessageEvent<CommentBroadcastMessage>
        ) => {
            const {type} = event.data;

            if (type === 'COMMENT_ADDED' || type === 'COMMENT_DELETED') {
                setIsUpdating(true);
                loadComments();
            }
        };

        commentChannel.addEventListener('message', handleMessage);

        return () => {
            commentChannel?.removeEventListener('message', handleMessage);
        };
    }, []);

    return {
        comments,
        isLoading,
        isUpdating,
        error,
        refreshComments: loadComments,
    };
}
