import * as express from 'express';
import UserManager from '../users/user.manager';

class UserController {

    private path: string = '/users';
    private router = express.Router();
    private userManager: UserManager;

    constructor() {
        this.userManager = new UserManager();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
    }

    private getAllUsers = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        let users = await this.userManager.getAllUsers();
        response.send(users);
    }
}

export default UserController;
