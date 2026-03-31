import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.middleware';
import upload from '../middleware/upload.middleware';
import { validatePost } from '../middleware/validationMiddleware';
import { PostController } from '../controller/postController';


router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);


router.post('/',
    authMiddleware,
    upload.single('image'),
    validatePost,
    PostController.createPost
);

router.put('/:id',
    authMiddleware,
    upload.single('image'),
    validatePost,
    PostController.updatePost
);

router.delete('/:id',
    authMiddleware,
    PostController.deletePost
);

router.get('/user/posts',
    authMiddleware,
    PostController.getUserPosts
);

export default router;