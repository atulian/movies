//conexion
var con = require('../conexion_bd.js');

var controller = {
    agregarVoto: function (req,res){
        
        var idPelicula = req.body.idPelicula;
        var idCompetencia = req.params.id;


        var sql = "INSERT INTO Votos (idPelicula,idCompetencia) VALUES (?,?)";
        
        con.query(sql,[idPelicula,idCompetencia], function(err,resultado,fields){
            if(err){
                console.log("Ocurrio un error en la consulta", err.message);
                return res.status(404).send("Hubo un error en consulta");
            }

            res.json(resultado);

        });


    },
    masVotados: function (req,res){
        var idCompetencia = req.params.id;

        if (!idCompetencia){
            console.log("No existe");
            return res.status(404).send("No existe");
        }

        var sql = "SELECT COUNT(V.idPelicula) as votos, C.descripcion, V.idPelicula as pelicula_id, P.titulo, P.poster FROM Votos V" 
        sql +=" INNER JOIN Pelicula P on P.id = V.idPelicula INNER JOIN Competencia C ON C.id = V.idCompetencia" 
        sql +=" WHERE idCompetencia = ? GROUP BY idPelicula ORDER BY votos DESC LIMIT 3"; 

        
        con.query(sql,[idCompetencia], function(err, resultado,fields){
            if(err){
                console.log("Ocurrio un error en la consulta");
                return res.status(404).send("Hubo un error en consulta");
            }

            if (resultado.length == 0){
                console.log("No hay datos");
                return res.send("No hay datos");
            }

            var resultados = {
                competencia: resultado[0].descripcion,
                resultados: resultado,
            }

            res.json(resultados);
        });
    }
}

module.exports = controller;