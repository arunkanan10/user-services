import 'dotenv/config';
import App from './app';
import UserController from './users/user.controller';
import connect from './helpers/connect';
import PrerequisiteController from './prerequisite/prerequisite.controller';

const constrollers = [new UserController(), new PrerequisiteController()];
const app = new App(constrollers);

app.listen();
const db = 'mongodb://localhost/users-db';
connect({db});

