import 'dotenv/config';
import App from './app';
import UserController from './users/user.controller';
import { sequelize } from './helpers/sequelize.config';
import PrerequisiteController from './prerequisite/prerequisite.controller';

const constrollers = [new UserController(), new PrerequisiteController()];
const app = new App(constrollers);

sequelize.setConnection().then((success) => {
    console.log(success);
    app.listen();
}).catch((error) => {
    console.log(error);
});
