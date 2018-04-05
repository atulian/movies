//conexion 
var con = require('../conexion_bd.js');

var controller = {

    listarGeneros : function (req,res){
        var sql = "SELECT * FROM genero";

        con.query(sql,function(err,resultado,field){
            if(err){
                console.log("Ocurrio un error en la consulta", err.message);
                return res.status(404).send("Hubo un error en consulta");

            }

            res.json(resultado);

        });


    },

    listarDirectores: function (req,res){
        var sql = "SELECT * FROM director";

        con.query(sql,function(err,resultado,field){
            if(err){
                console.log("Ocurrio un error en la consulta", err.message);
                return res.status(404).send("Hubo un error en consulta");

            }

            res.json(resultado);
        });


    },

    listarActores: function(req,res){
        var sql = "SELECT * FROM actor";

        con.query(sql,function(err,resultado,field){
            if(err){
                 console.log("Ocurrio un error en la consulta", err.message);
                return res.status(404).send("Hubo un error en consulta");
            }

            res.json(resultado);
        });

    }

}


module.exports = controller;