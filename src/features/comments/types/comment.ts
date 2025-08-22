export interface Comment {
    id: string;
    text: string;
    createdAt: number;
    parentId: string | null;
    children?: Comment[];
    username: string;
    avatar: string;
}

export type CommentsList = Comment[];

export interface CommentAddedMessage {
    type: 'COMMENT_ADDED';
    commentId: string;
    parentId: string | null;
}

export interface CommentDeletedMessage {
    type: 'COMMENT_DELETED';
    commentId: string;
    deletedIds: string[];
}

export type CommentBroadcastMessage =
    | CommentAddedMessage
    | CommentDeletedMessage;
