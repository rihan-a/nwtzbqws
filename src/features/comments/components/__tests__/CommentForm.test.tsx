import {render, screen} from '@testing-library/react';
import {vi, describe, it, expect} from 'vitest';
import CommentForm from '../CommentForm';

vi.mock('../../hooks/useSessionUser', () => ({
    useSessionUser: () => ({
        currentUser: {
            username: 'TestUser',
            avatar: '{"color":"#222222","initials":"TU"}',
        },
        isLoading: false,
    }),
}));

vi.mock('../../hooks/useCommentForm', () => ({
    useCommentForm: () => ({
        text: '',
        setText: vi.fn(),
        isSubmitting: false,
        handleSubmit: vi.fn(),
    }),
}));

describe('CommentForm', () => {
    it('renders comment form with user info', () => {
        render(<CommentForm onCommentChange={() => {}} />);

        expect(screen.getByText('TestUser')).toBeInTheDocument();
        expect(screen.getByText('TU')).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('Add your comment here...')
        ).toBeInTheDocument();
    });

    it('shows reply placeholder when parentId is provided', () => {
        render(<CommentForm onCommentChange={() => {}} parentId="parent123" />);

        expect(
            screen.getByPlaceholderText('Write a reply...')
        ).toBeInTheDocument();
    });
});
