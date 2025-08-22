import {ArrowUp, X} from 'lucide-react';
import UserAvatar from './ui/UserAvatar';
import {useSessionUser} from '../hooks/useSessionUser';
import {useCommentForm} from '../hooks/useCommentForm';

type CommentFormProps = {
    onCommentChange: () => void;
    parentId?: string | null;
    onCancel?: () => void;
};

function CommentForm({
    onCommentChange,
    parentId = null,
    onCancel,
}: CommentFormProps) {
    const {currentUser, isLoading} = useSessionUser();
    const {text, setText, isSubmitting, handleSubmit} = useCommentForm({
        parentId,
        onCommentChange,
    });

    if (isLoading || !currentUser) {
        return (
            <div className="w-full flex justify-center py-8">
                <div className="text-sm text-neutral-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-3 p-2 w-[130px] border border-neutral-300 bg-neutral-100 rounded-lg">
                <UserAvatar
                    avatar={currentUser.avatar}
                    username={currentUser.username}
                    timestamp=""
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col lg:flex-row justify-between items-center bg-neutral-200 rounded-[10px] p-2"
            >
                <input
                    className="h-12 lg:h-14 p-3 lg:p-4 w-full lg:w-[95%] focus:none focus:outline-0 mb-2 lg:mb-0"
                    type="text"
                    placeholder={
                        parentId
                            ? 'Write a reply...'
                            : 'Add your comment here...'
                    }
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isSubmitting}
                />
                <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                    <button
                        className="bg-black text-white text-xs lg:text-sm p-2 lg:p-3 rounded-[30px] cursor-pointer hover:bg-neutral-700 disabled:bg-neutral-400"
                        style={{
                            backgroundColor:
                                text.trim() && !isSubmitting
                                    ? '#000'
                                    : '#878787',
                        }}
                        type="submit"
                        disabled={!text.trim() || isSubmitting}
                    >
                        <ArrowUp color="white" size={18} strokeWidth={2} />
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-neutral-500 text-white text-xs lg:text-sm p-2 lg:p-3 rounded-[30px] cursor-pointer hover:bg-neutral-700"
                            disabled={isSubmitting}
                        >
                            <X color="white" size={18} strokeWidth={2} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CommentForm;
