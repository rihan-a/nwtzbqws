import Dexie, {type Table} from 'dexie';
import type {Comment} from '../features/comments/types/comment';

const db = new Dexie('CommentsDB') as Dexie & {
    comments: Table<Comment, string>;
};

// Schema declaration:
db.version(1).stores({
    comments: 'id, parentId, createdAt',
});

export {db};
