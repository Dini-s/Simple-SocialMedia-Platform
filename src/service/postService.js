import { PostModel } from "../models/PostModel";

export class PostService {

    static async createPost(postData, creatorId, imageFile = null) {
        let imagUrl = null;

        if (imageFile) {

            imagUrl = `/upload/${imageFile.filename}`;
        }

        return PostModel.create({
            ...postData,
            creatorId,
            imagUrl
        });
    }

    static async getAllPosts(page = 1, limit = 10) {
        page = parseInt(page);
        limit = parseInt(limit);

        if (page < 1) page = 1;
        if (limit < 1 || limit > 50) limit = 10;

        return PostModel.findAll(page, limit);
    }

    static async getPostById(id) {
        const post = PostModel.findById(id);

        if (!post) {
            throw new Error('Post not found')
        }
        return post;
    }

    static async updatePost(id, upateData, userId, imageFile = null) {
        const post = PostModel.findById(id);

        if (!post) {
            throw new Error('Post not found')
        }
        if (post.creator !== parseInt(userId)) {
            throw new Error('Unauthorized to update this post');
        }

        let imageUrl = post.imagUrl;
        if (imageFile) {
            if (post.imagUrl) {
                const oldImagePath = path.join(__dirname, '../../', post.imageUrl);
                fs.unlink(oldImagePath).catch(console.error);
            }
            imageUrl = `/uploads/${imageFile.filename}`;
        }

        return PostModel.update(id, { ...upateData, imageUrl });

    }

    static async deletePost(id, userid) {
        const post = PostModel.findById(id);

        if (!post) {
            throw new Error('Post not found');
        }

        if (post.creator !== parseInt(userId)) {
            throw new Error('Unauthorized to update this post');
        }

        if (post.imagUrl) {
            const oldImagePath = path.join(__dirname, '../../', post.imageUrl);
            fs.unlink(oldImagePath).catch(console.error);
        }
        return PostModel.delete(id);
    }

    static async getUserPosts(userid) {
        return PostModel.findByCreator(userid);
    }
}