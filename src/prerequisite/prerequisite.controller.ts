import * as express from 'express';
const https = require('https');

class PrerequisiteController {
    public path = '/prerequisite';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.fetchAndProcessUsers);
    }

    private fetchAndProcessUsers = (request: express.Request, response: express.Response) => {
        console.log ('######## fetchAndProcessUsers Started ');
        this.httpRequest().then(function(result) {
            console.log(result);
            response.send(result);
        }, function(err) {
            console.log(err);
        });
    }

    private httpRequest() {
        return new Promise(function(resolve, reject) {
            https.get('https://jsonplaceholder.typicode.com/users', (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    console.log(JSON.parse(data));
                    resolve(JSON.parse(data));
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
            });
        });
    }
}

export default PrerequisiteController;
