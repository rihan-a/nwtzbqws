import {useState} from 'react';
import {addComment} from '../../../services/commentsService';

type UseCommentFormProps = {
    parentId: string | null;
    onCommentChange: () => void;
};

export function useCommentForm({
    parentId,
    onCommentChange,
}: UseCommentFormProps) {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (text.trim() && !isSubmitting) {
            try {
                setIsSubmitting(true);
                await addComment({
                    text: text.trim(),
                    createdAt: Date.now(),
                    parentId: parentId,
                });
                setText('');
                onCommentChange();
            } catch (error) {
                console.error('Failed to add comment:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    return {
        text,
        setText,
        isSubmitting,
        handleSubmit,
    };
}
