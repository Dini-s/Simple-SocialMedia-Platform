import { PostService } from "../service/postService";

export class ViewController {
    static async renderHomePage(req, res, next) {
        try {
            const { page = 1, limit = 5 } = req.query;
            const result = await PostService.getAllPosts(page, limit);

            res.render('home', {
                title: 'Social Media Platform',
                posts: result.posts,
                pagination: {
                    currentPage: result.currentPage,
                    totalPages: result.totalPages,
                    hasNext: result.currentPage < result.totalPages,
                    hasPrev: result.currentPage > 1
                },
                user: req.user || null
            });
        } catch (error) {
            next(error);
        }
    }

    static renderCreatePostPage(req, res) {
        res.render('create-post', {
            title: 'Create New Post',
            user: req.user
        });
    }

    static renderEditPostPage(req, res, next) {
        // Implementation for edit page
    }

    static renderLoginPage(req, res) {
        res.render('login', { title: 'Login' });
    }

    static renderRegisterPage(req, res) {
        res.render('register', { title: 'Register' });
    }
}

