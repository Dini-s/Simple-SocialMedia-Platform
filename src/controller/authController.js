import { AuthService } from "../service/authService";

export class AuthController {

    static async register(req, res, next) {

        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields required" });
            }

            const result = await AuthService.register({
                name,
                email,
                password
            });

            res.status(201).json({
                message: "User Registered SuccessFullty",
                user: result.user,
                token: result.token
            })
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const result = await AuthService.login(email, password);

            res.json({
                message: 'Login successful',
                user: result.user,
                token: result.token
            });
        } catch (error) {
            next(error);
        }
    }
}