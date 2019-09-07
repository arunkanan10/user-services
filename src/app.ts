import * as express from 'express';
import * as bodyParser from 'body-parser';

class App {
    public app: express.Application;
    public port: number = 5000;

    constructor(controllers: any) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeControllers(controllers);

        process.on('uncaughtException', (err) => {
            console.log(`Error: ${err.message}`)
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: any) {
        controllers.forEach((controller: any) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('App listening on Port:: ', this.port);
        });
    }
}

export default App;
