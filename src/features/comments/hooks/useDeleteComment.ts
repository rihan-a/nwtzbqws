import {useState} from 'react';
import {deleteComment} from '../../../services/commentsService';

export function useDeleteComment(onCommentChange: () => void) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (commentId: string) => {
        if (isDeleting) {
            return;
        }
        try {
            setError(null);
            setIsDeleting(true);
            await deleteComment(commentId);
            onCommentChange();
        } catch (error) {
            console.log(error);
            setError('Failed to delete comment');
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        isDeleting,
        error,
        handleDelete,
    };
}
