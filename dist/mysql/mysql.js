"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySql {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'user',
            password: 'user',
            database: 'node_db'
        });
        //this.connection.connect();
        this.conectarDb();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarquery(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            if (err) {
                console.log('error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('No existen resultados');
            }
            callback(null, results);
        });
    }
    conectarDb() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos online');
        });
    }
}
exports.default = MySql;
