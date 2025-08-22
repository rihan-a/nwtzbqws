import type {CommentBroadcastMessage} from '../features/comments/types/comment';

let commentChannel: BroadcastChannel | null = null;

try {
    commentChannel = new BroadcastChannel('comments-updates');
} catch (error) {
    console.warn(
        'BroadcastChannel not supported, real-time updates disabled:',
        error
    );
    commentChannel = null;
}

export const broadcastMessage = (message: CommentBroadcastMessage) => {
    if (commentChannel) {
        try {
            commentChannel.postMessage(message);
        } catch (error) {
            console.warn('Failed to broadcast message:', error);
        }
    }
};

export {commentChannel};
