import {describe, it, expect, vi, beforeEach} from 'vitest';
import {addComment} from '../commentsService';
import {db} from '../../db/commentsDb';
import {broadcastMessage} from '../broadcastService';

vi.mock('../../db/commentsDb', () => ({
    db: {
        comments: {
            add: vi.fn(),
        },
    },
}));
vi.mock('../userSessionService', () => ({
    getSessionUser: () => ({username: 'TestUser', avatar: 'test.png'}),
}));
vi.mock('../broadcastService', () => ({
    broadcastMessage: vi.fn(),
}));
vi.mock('uuid', () => ({v4: () => '123'}));

describe('addComment', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('creates and stores a new comment with session user', async () => {
        const commentInput = {
            text: 'Hello world',
            parentId: null,
            createdAt: Date.now(),
        };

        const expectedComment = {
            ...commentInput,
            id: '123',
            username: 'TestUser',
            avatar: 'test.png',
            children: [],
        };
        const newComment = await addComment(commentInput);

        expect(db.comments.add).toHaveBeenCalledWith(expectedComment);

        expect(broadcastMessage).toHaveBeenCalledWith({
            type: 'COMMENT_ADDED',
            commentId: '123',
            parentId: null,
        });

        expect(newComment).toMatchObject(expectedComment);
    });
});
