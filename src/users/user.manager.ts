import * as express from 'express';
import SqlManager from '../helpers/sql.manager';
import User from '../users/user.interface';

class UserManager {

    private sqlManager: SqlManager;

    constructor() {
        this.sqlManager = new SqlManager();
    }

    public createAUser(request: express.Request, response: express.Response) {
        return new Promise((resolve, reject) => {
            let qry: string = `INSERT INTO user (id, name) VALUES (:id, :name)`;
            let user: User = {id: request.body.id, name: request.body.name};
            this.sqlManager.Insert(qry, user).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public getAllUsers(request: express.Request, response: express.Response) {

        console.log('Mgmr - getAllUsers invoked');

        return new Promise((resolve, reject) => {
            
            this.sqlManager.ExecuteQuery('SELECT id, name FROM user').then(res => {
                let users: User[] = [];
                res.forEach(row => {
                    let user: User = {id: row.id, name: row.name};
                    users.push(user);
                });
                console.log ('GetAllUsers Query Execution completed');
                resolve(users);
            }).catch(error => {
                console.log('Error :: ', error);
                reject(error);
            });
        });
    }
}

export default UserManager;
