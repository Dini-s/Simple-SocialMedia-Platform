
export const validatePost = (req, res, next) => {
    const { title, content } = req.body;

    if (!title || title.length < 3 || title.length > 100) {
        return res.status(400).json({
            message: 'Title must be between 3 and 100 characters'
        });
    }

    if (!content || content.length < 10) {
        return res.status(400).json({
            message: 'Content must be at least 10 characters'
        });
    }

    next();
};

