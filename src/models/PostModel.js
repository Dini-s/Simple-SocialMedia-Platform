import { Post } from "./post";

const posts = [];
let postIdCounter = 1;

export class PostModel {

    static create(postData) {
        const post = new Post(
            postIdCounter++,
            postData.title,
            postData.content,
            postData.creator,
            postData.imgeUrl
        );
        posts.push(post);
        return post;
    }

    static findAll(page = 1, limit = 10) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPosts = posts.slice(startIndex, endIndex);

        return {
            posts: paginatedPosts,
            currentPage: page,
            totalPage: Math.ceil(posts.length / limit),
            totalPost: posts.length
        }
    }

    static findById(id) {
        return posts.find(post => post.id === parseInt(id));
    }

    static update(id, updateData) {
        const post = this.findById(id);
        if (post) {
            Object.assign(post, updateData);
            post.updatedAt = new Date();
            return post;
        }
        return null;
    }

    static delete(id) {
        const index = posts.findIndex(post => post.id === parseInt(id));
        if (index !== -1) {
            return posts.splice(index, 1)[0];
        }
        return null;
    }

    static findByCreator(creatorId) {
        return posts.filter(post => post.authorId === parseInt(creatorId));
    }
}