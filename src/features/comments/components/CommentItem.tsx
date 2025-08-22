import {useState} from 'react';
import type {Comment} from '../types/comment';
import CommentForm from './CommentForm';
import {Reply, Trash} from 'lucide-react';
import {formatTimestamp} from '../../../utils/formatTimestamp';
import UserAvatar from './ui/UserAvatar';
import ErrorMessage from './ui/ErrorMessage';
import {useDeleteComment} from '../hooks/useDeleteComment';

type CommentItemProps = {
    comment: Comment;
    onCommentChange: () => void;
};

function CommentItem({comment, onCommentChange}: CommentItemProps) {
    const [isReplying, setIsReplying] = useState(false);
    const {isDeleting, error, handleDelete} = useDeleteComment(onCommentChange);

    return (
        <div className={`${comment.parentId ? 'ml-4 lg:ml-8' : ''}`}>
            {error && <ErrorMessage message={error} />}
            <div className="flex flex-col w-full rounded-lg my-3">
                <div
                    className={`flex gap-3 ${
                        comment.parentId ? 'bg-neutral-200' : 'bg-neutral-100'
                    } rounded-lg p-2`}
                >
                    <div className="ml-1 pr-2 border-r border-neutral-400">
                        <UserAvatar
                            avatar={comment.avatar}
                            username={comment.username}
                            timestamp={formatTimestamp(comment.createdAt)}
                        />
                    </div>

                    <div className="flex justify-between items-start gap-4 flex-1">
                        <p className="text-sm lg:text-base text-neutral-700 break-words leading-relaxed flex-1">
                            {comment.text}
                        </p>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                className="text-xs lg:text-sm p-2 bg-white rounded-md cursor-pointer hover:bg-neutral-200 disabled:opacity-50 transition-colors"
                                onClick={() => setIsReplying(!isReplying)}
                                disabled={isDeleting}
                                title="Reply"
                            >
                                <Reply
                                    color="black"
                                    size={16}
                                    strokeWidth={2}
                                />
                            </button>
                            <button
                                className="text-xs lg:text-sm p-2 bg-white rounded-md cursor-pointer hover:bg-neutral-200 disabled:opacity-50 transition-colors"
                                onClick={() => handleDelete(comment.id)}
                                disabled={isDeleting}
                                title="Delete"
                            >
                                <Trash
                                    color="black"
                                    size={16}
                                    strokeWidth={2}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {isReplying && (
                    <div className="ml-4 lg:ml-8 mt-2">
                        <CommentForm
                            parentId={comment.id}
                            onCommentChange={() => {
                                onCommentChange();
                                setIsReplying(false);
                            }}
                            onCancel={() => setIsReplying(false)}
                        />
                    </div>
                )}

                {comment.children && comment.children.length > 0 && (
                    <div className="ml-4 lg:ml-8">
                        {comment.children.map((childComment) => (
                            <CommentItem
                                key={childComment.id}
                                comment={childComment}
                                onCommentChange={onCommentChange}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
