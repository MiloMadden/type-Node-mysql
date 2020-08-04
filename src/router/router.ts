
import { Router, Request, Response } from 'express';
import MySql from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req:Request, res:Response)=>{

    const query = 'SELECT * FROM heroes';

    MySql.ejecutarquery(query, (err:any, heroes:Object[])=>{

        if(err){
            return res.status(400).json({
                ok: false, 
                err
            })
        }

        res.json({
            ok:true, 
            heroes: heroes
        })

    });

})

router.get('/heroes/:id', (req:Request, res:Response)=>{

    let id = req.params.id;
    let escapedId = MySql.instance.connection.escape(id);

    const query = `SELECT * FROM heroes WHERE id = ${escapedId}`;

    MySql.ejecutarquery(query, (err:any, heroes:Object[])=>{

        if(err){
            return res.status(400).json({
                ok: false, 
                err
            })
        }

        res.json({
            ok:true, 
            heroes: heroes
        })

    });

})

export default router;