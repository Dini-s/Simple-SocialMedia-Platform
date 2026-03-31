import { User } from "./user";

const users = [];
let userIdCount = 1;

export class UserModel {
    static create(userData) {
        const user = new User(
            userIdCount++,
            userData.name,
            userData.email,
            userData.password
        );

        users.push(user);
        return user;
    }

    static findyByEmail(email) {
        return users.find(user => user.email === email);
    }

    static findbyId(id) {
        return users.find(user => user.id === parseInt(id));
    }

    static findAll() {
        return users;
    }
}


