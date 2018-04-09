//conexion
var con = require('../conexion_bd.js');

var controller = {

    agregarCompetencia: function(req,res){
        var nombre = req.body.nombre;
        var genero = req.body.genero;
        var actor = req.body.actor;
        var director = req.body.director;

        var sql = "INSERT INTO competencia (descripcion,idGenero,idActor,idDirector) VALUES (?,?,?,?)";

        con.query(sql,[nombre,genero,actor,director], function (err, resultado, field){
            if(err){
                console.log("Ocurrio un error en la consulta", err.message);
                return res.status(404).send("Hubo un error en consulta");
            }

            res.json(resultado);
        })
    },

    editarCompetencia: function(req,res){
        var id = req.params.id;


        if(!id){
            console.log('No existe');
            return res.status(404).send('No existe');
        }

        var nombre = req.body.nombre;
        var genero = req.body.genero;
        var actor = req.body.actor;
        var director = req.body.director;

        var sql = "UPDATE competencia SET descripcion = ? , idGenero = ? , idActor = ? , idDirector = ? WHERE id = " + id;
 
        con.query(sql, [nombre,genero,actor,director], function(err,resultado,field){
            if (err) {
                console.log("Ocurrio un error en la consulta", err.message);
                return res.status(404).send("Hubo un error en consulta");
            }

            res.json(resultado);
        });

    },

    obtenerCompetencia: function(req,res){
        var id = req.params.id;
        console.log(id);
        
        if(!id){
            console.log('No existe');
            return res.status(404).send('No existe');
        }

        var sql = "SELECT C.descripcion as nombre, A.nombre as actor_nombre, D.nombre as director_nombre, G.nombre as genero_nombre"
        sql += " FROM competencia C LEFT JOIN genero G ON C.idGenero = G.id"
        sql += " LEFT JOIN actor A on C.idActor = A.id"
        sql += " LEFT JOIN director D ON C.idDirector = D.id  WHERE C.id = ?";


        con.query(sql,[id], function(err,resultado,field){
            if (err){
                console.log("Ocurrio un error en la consulta", err.message);
                return res.status(404).send("Hubo un error en consulta");
            }

            res.json(resultado[0]);

        });

    },

    eliminarCompetencia: function(req,res){
        var id = req.params.id;

        if (!id){
            console.log('No existe');
            res.status(404).send('No existe');
        }

        var sql = "DELETE FROM Competencia WHERE id = ?"
        
        con.query(sql,[id], function(err,resultado,field){

            if (err){
                console.log('Hubo un error');
                res.status(404).send("Hubo un error en la consulta");
            }

            res.send('Eliminado correctamente');

        });
        
    },


    listarCompetencias: function (req,res){
        var sql = "SELECT * FROM Competencia";

        con.query(sql,function(err,resultado,field){
            if(err){
                console.log("Ocurrio un error en la consulta", err.message);
                return res.status(404).send("Hubo un error en consulta");
            }

            if(resultado.lenght == 0){
                console.log("No hay datos");
                return res.status(404).send("No hay datos");
            }

            res.json(resultado);
        });
    },

    listarPeliculasAzar: function (req,res){
        //obtener competencia

        var idCompetencia = req.params.id;
        var sql = "SELECT * FROM competencia WHERE id = ?";

        con.query(sql,[idCompetencia], function(error,resultado,field){
            
            var idGenero = resultado[0].idGenero;
            var idActor = resultado[0].idActor;
            var idDirector = resultado[0].idDirector;

            var where = "";

            if (idGenero != 0){
                where = " WHERE";
                where += " genero_id = " + idGenero;
            }
            if (idActor != 0){
                if (where == ""){
                    where = " WHERE"
                }
                where += " OR ap.actor_id = " + idActor;
            }
            if (idDirector != 0){
                if (where == ""){
                    where = " WHERE"
                }
                where += " OR dp.director_id = " + idDirector;
            }

            //obtener peliculas
            var sql = "select p.*, ap.actor_id, dp.director_id from pelicula p "
            sql += "inner join actor_pelicula ap on ap.pelicula_id = p.id "
            sql += "inner join director_pelicula dp on dp.pelicula_id = p.id "
            sql += where
            sql += " order by rand() limit 2";

            
            con.query(sql,function(err,resultadoP,field){
                
            if(err){
                console.log("Ocurrio un error en la consulta", err.message);
                return res.status(404).send("Hubo un error en consulta");
            }

            if(resultadoP.lenght == 0){
                console.log("No hay datos");
                return res.status(404).send("No hay datos");
            }

            var respuesta = {
                competencia: resultado[0].descripcion,
                peliculas: resultadoP
            }

            
            res.json(respuesta);

        });


        })

        
    }
}

module.exports = controller;