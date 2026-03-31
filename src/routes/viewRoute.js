import express from 'express';
import { ViewController } from '../controller/viewController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', ViewController.renderHomePage);
router.get('/login', ViewController.renderLoginPage);
router.get('/register', ViewController.renderRegisterPage);
router.get('/create-post', authMiddleware, ViewController.renderCreatePostPage);

module.exports = router;