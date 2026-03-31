const { PostService } = require("../service/postService");
export class PostController {
    static async createPost(req, res, next) {
        try {
            const { title, content } = req.body;
            const authorId = req.user.id;
            const imageFile = req.file;

            if (!title || !content) {
                return res.status(400).json({ message: 'Title and content are required' });
            }

            const post = await PostService.createPost(
                { title, content },
                authorId,
                imageFile
            );

            res.status(201).json({
                message: 'Post created successfully',
                post
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllPosts(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await PostService.getAllPosts(page, limit);

            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    static async getPostById(req, res, next) {
        try {
            const { id } = req.params;
            const post = await PostService.getPostById(id);

            res.json({ post });
        } catch (error) {
            next(error);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const userId = req.user.id;
            const imageFile = req.file;

            const post = await PostService.updatePost(
                id,
                { title, content },
                userId,
                imageFile
            );

            res.json({
                message: 'Post updated successfully',
                post
            });
        } catch (error) {
            next(error);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            await PostService.deletePost(id, userId);

            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    static async getUserPosts(req, res, next) {
        try {
            const posts = await PostService.getUserPosts(req.user.id);

            res.json({ posts });
        } catch (error) {
            next(error);
        }
    }
}

