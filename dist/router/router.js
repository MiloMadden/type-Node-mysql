"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = 'SELECT * FROM heroes';
    mysql_1.default.ejecutarquery(query, (err, heroes) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            heroes: heroes
        });
    });
});
router.get('/heroes/:id', (req, res) => {
    let id = req.params.id;
    let escapedId = mysql_1.default.instance.connection.escape(id);
    const query = `SELECT * FROM heroes WHERE id = ${escapedId}`;
    mysql_1.default.ejecutarquery(query, (err, heroes) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            heroes: heroes
        });
    });
});
exports.default = router;
