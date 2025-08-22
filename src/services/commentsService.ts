import {db} from '../db/commentsDb';
import type {
    Comment,
    CommentBroadcastMessage,
} from '../features/comments/types/comment';
import {v4 as uuidv4} from 'uuid';
import {getSessionUser} from './userSessionService';
import {broadcastMessage} from './broadcastService';

export const addComment = async (
    comment: Omit<Comment, 'id' | 'username' | 'avatar'>
): Promise<Comment> => {
    const sessionUser = getSessionUser();
    const newComment: Comment = {
        ...comment,
        id: uuidv4(),
        username: sessionUser.username,
        avatar: sessionUser.avatar,
        children: [],
    };

    await db.comments.add(newComment);

    // Broadcast to other tabs
    const message: CommentBroadcastMessage = {
        type: 'COMMENT_ADDED',
        commentId: newComment.id,
        parentId: comment.parentId,
    };
    broadcastMessage(message);

    return newComment;
};

// Get all comments and organize them into a tree structure
export const getAllComments = async (): Promise<Comment[]> => {
    const allComments = await db.comments.toArray();

    // Build the comment tree recursively
    const buildCommentTree = (parentId: string | null): Comment[] => {
        const comments = allComments.filter((c) => c.parentId === parentId);

        return comments
            .map((comment) => ({
                ...comment,
                children: buildCommentTree(comment.id),
            }))
            .sort((a, b) => b.createdAt - a.createdAt);
    };

    return buildCommentTree(null);
};

// Delete a comment and all its replies
export const deleteComment = async (id: string): Promise<void> => {
    // Find all replies to this comment (including nested ones)
    const getAllReplies = async (commentId: string): Promise<string[]> => {
        const directReplies = await db.comments
            .where('parentId')
            .equals(commentId)
            .toArray();
        let allReplyIds = directReplies.map((r) => r.id);

        // Recursively get nested replies
        for (const reply of directReplies) {
            const nestedReplies = await getAllReplies(reply.id);
            allReplyIds = [...allReplyIds, ...nestedReplies];
        }

        return allReplyIds;
    };

    const replyIds = await getAllReplies(id);
    const idsToDelete = [id, ...replyIds];
    await db.comments.bulkDelete(idsToDelete);

    // Broadcast to other tabs
    const message: CommentBroadcastMessage = {
        type: 'COMMENT_DELETED',
        commentId: id,
        deletedIds: idsToDelete,
    };
    broadcastMessage(message);
};
