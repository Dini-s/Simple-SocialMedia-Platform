import bcrypt from 'bcryptjs';
import { UserModel } from "../models/UserModel";
import jwt from 'jsonwebtoken';

export class AuthService {

    static async register(userData) {

        //check if user exists
        const existUser = UserModel.findByEmail(userData.email);

        if (existUser) {
            throw new Error('User already registered');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = UserModel.create({
            ...userData,
            password: hashedPassword
        });

        //generateToken
        const token = this.generateToken(user.id);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token
        };
    }

    static async login(email, password) {

        const user = UserModel.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid Credentials');
        }

        const token = this.generateToken(user.id);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token
        }
    }

    static generateToken(userId) {
        return jwt.sign(
            { userId },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1d' }
        )
    }
}