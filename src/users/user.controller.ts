import * as express from 'express';
import User from './user.interface';
import UserManager from './user.manager';

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

        console.log('Ctrl - getAllUsers invoked');
        let users = await this.userManager.getAllUsers(request, response);
        console.log('Respond back from Ctrl. Bye');
        response.send(users);
    }
}

export default UserController;
