import * as SqlConnection from 'sequelize';
export class SequelizeConfig {
    private sequelize: SqlConnection.Sequelize;
    private dbInfo: Object = {
        user: null,
        password: null,
        host: null,
        database: 'FACP_NEW',
        requestTimeout: 300000,
        dbType: 'sqlite',
        'storage': './db/mydb.db'
    };

    public setConnection() {
        console.log ('######## SetConnection() ##########');
        return new Promise((resolve, reject) => {
            try {
                this.sequelize = new SqlConnection(this.dbInfo['database'], this.dbInfo['user'], this.dbInfo['password'], {
                    host: this.dbInfo['host'],
                    dialect: this.dbInfo['dbType'],
                    logging: false,
                    storage: this.dbInfo['storage']
                });
                this.ping(this.dbInfo);
                resolve("DB connection successful");
            } catch (err) {
                reject(err);
            }
        });
    }

    private ping(dbInfo) {
        this.sequelize
            .authenticate()
            .then(function (err) {
                console.log(`Connection has been established to the database: ${dbInfo.server} - ${dbInfo.database} successfully.`);
            })
            .catch(function (err) {
                console.log(`Unable to connect to the database: : ${dbInfo.server} - ${dbInfo.database}`, err);
            });
    }
    public getSequelize() {
        if (!this.sequelize) {
            this.setConnection();
        }
        console.log ('######## getSequelize() ##########');
        return this.sequelize;
    }
}

export const sequelize = new SequelizeConfig();
