
import mysql = require('mysql');

export default class MySql{

    private static _instance:MySql;

    connection:mysql.Connection;
    conectado:boolean = false;

    constructor(){

        console.log('Clase inicializada');

        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'user',
            password : 'user',
            database : 'node_db'
        });
        //this.connection.connect();
        this.conectarDb();

    }


    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    static ejecutarquery(query:string, callback: Function){
        this.instance.connection.query(query, (err, results:Object[], fields)=>{

            if(err){
                console.log('error en query');
                console.log(err)
                return callback(err);
            }

            if(results.length===0){
                callback('No existen resultados');
            }

            callback(null, results );

        })
    }


    private conectarDb(){
        
        this.connection.connect( (err:mysql.MysqlError)=>{
            
            if(err){
                console.log(err.message);
                return; 
            }

            this.conectado = true;
            console.log('Base de datos online');

        } );
    }

}
