import * as express from 'express';
import { IUser } from '../models/user.model';
import { IPost } from '../models/posts.model';
import UserManager from '../users/user.manager';
import PostManager from '../posts/post.manager';

const https = require('https');
const config = require("../config/config.js")

class PrerequisiteController {
    public path = '/prerequisite';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path + '/users', this.fetchAndProcessUsers);
        this.router.get(this.path + '/posts', this.fetchAndProcessPosts);
    }

    private fetchAndProcessUsers = async (request: express.Request, response: express.Response) => {
        console.log ('######## fetchAndProcessUsers Started ');

        this.httpRequest(config.usersUrl).then(function(result: IUser[]) {
            result.forEach(item => {
                let user = {
                    id: item.id,
                    name: item.name,
                    username: item.username,
                    address: {
                        street: item.address.street,
                        suite: item.address.suite,
                        city: item.address.city,
                        zipcode: item.address.zipcode,
                        geo: {
                            lat: item.address.geo.lat,
                            lng: item.address.geo.lng,
                        }
                    },
                    phone: item.phone,
                    website: item.website,
                    company: {
                        name: item.company.name,
                        catchPhrase: item.company.catchPhrase,
                        bs: item.company.bs
                    }
                }
                new UserManager().createUser(user);
            });

            response.send('User details inserted');
        }, function(err) {
            response.send(err);
        });
    }

    private fetchAndProcessPosts = async (request: express.Request, response: express.Response) => {
        console.log ('######## fetchAndProcessPosts Started ');

        this.httpRequest(config.postsUrl).then(function(result: IPost[]) {
            
            result.forEach(item => {
                let post = {
                    id: item.id,
                    userId: item.userId,
                    title: item.title,
                    body: item.body
                }
                new PostManager().CreatePost(post);
            });

            response.send('Posts details inserted');
        }, function(err) {
            response.send(err);
        });
    }

    private httpRequest(url) {
        return new Promise(function(resolve, reject) {
            https.get(url, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
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
