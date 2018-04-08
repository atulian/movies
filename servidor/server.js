//paquetes
var express = require('express');
var bodyParser = require('body-parser');


//controladores
var competenciaControlador = require('./controller/competenciaController.js');
var votosControlador = require('./controller/votosController.js');
var administrarControlador = require('./controller/administrarController.js');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


//mostrar competencias
app.get('/competencias', competenciaControlador.listarCompetencias);
app.get('/competencias/:id', competenciaControlador.obtenerCompetencia);
app.get('/competencias/:id/peliculas', competenciaControlador.listarPeliculasAzar);
app.get('/competencias/:id/resultados',votosControlador.masVotados);

//agregar competencia
app.post('/competencias', competenciaControlador.agregarCompetencia);   

//agregar voto
app.post('/competencias/:id/voto', votosControlador.agregarVoto);

//editar competencia

app.put('/competencias/id', competenciaControlador.editarCompetencia);

app.get('/generos',administrarControlador.listarGeneros);

app.get('/actores',administrarControlador.listarActores);

app.get('/directores',administrarControlador.listarDirectores);


var puerto = '8080';


app.listen(puerto, function(){
    console.log('Escuchando en el puerto ' + puerto);
});