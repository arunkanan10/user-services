import { sequelize } from './sequelize.config';
import * as SqlConnection from 'sequelize';

export class SqlManager {

    private _sequelize: SqlConnection.Sequelize;
    private params;

    constructor() {
        this._sequelize = sequelize.getSequelize();
    }

    public InitiateTransaction() {
        return this._sequelize.transaction();
    }

    public ExecuteQuery(qry: string) {
        return this._sequelize.query(qry, { type: this._sequelize.QueryTypes.SELECT });
    }

    public UpdateTransaction(qry: string, vals: any, _transaction) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.UPDATE, transaction: _transaction });
    }

    public ExecuteQueryWithTransaction(qry: string, vals: any, _transaction) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.SELECT, transaction: _transaction });
    }

    public InsertTransaction(qry: string, vals: any, _transaction) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.INSERT, transaction: _transaction });
    }

    public DeleteTransaction(qry: string, vals: any, _transaction) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.DELETE, transaction: _transaction });
    }

    public BulkInsertTransaction(tableName: string, vals: any, _transaction) {
        return this._sequelize.getQueryInterface().bulkInsert(tableName, vals,
            { type: this._sequelize.QueryTypes.INSERT, transaction: _transaction })
    }

    public Get(qry: string, vals: any) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.SELECT });
    }

    public Insert(qry: string, vals: any) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.INSERT });
    }

    public Update(qry: string, vals: any) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.UPDATE });
    }

    public BulkInsert(tableName: string, vals: any) {
        return this._sequelize.getQueryInterface().bulkInsert(tableName, vals)
    }

    public BulkUpdate(qry: string, vals: any) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.BULKUPDATE });
    }

    public Delete(qry: string, vals: any) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.DELETE });
    }

    public BulkDelete(qry: string, vals: any) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: this._sequelize.QueryTypes.BULKDELETE });
    }
}

export default SqlManager;
