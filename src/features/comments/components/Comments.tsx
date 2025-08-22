import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import {useComments} from '../hooks/useComments';
import ErrorMessage from './ui/ErrorMessage';

function Comments() {
    const {comments, isLoading, isUpdating, error, refreshComments} =
        useComments();

    const handleCommentChange = async () => {
        await refreshComments();
    };

    if (isLoading) {
        return (
            <div className="text-center py-8 text-sm lg:text-base">
                Loading comments...
            </div>
        );
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <section className="flex flex-col items-center justify-center w-full">
            <CommentForm onCommentChange={handleCommentChange} />

            {isUpdating && (
                <div className="w-full mt-4 p-2 border rounded-lg text-center">
                    <span className="text-sm">
                        Updating from another tab...
                    </span>
                </div>
            )}

            <h3 className="flex-start text-lg lg:text-xl w-full mt-6 lg:mt-10 mb-4">
                {comments.length ? 'Comments' : 'No comments'}
            </h3>
            <div className="w-full">
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        onCommentChange={handleCommentChange}
                    />
                ))}
            </div>
        </section>
    );
}

export default Comments;
