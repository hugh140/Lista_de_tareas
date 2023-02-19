import express from "express";
import mysql from "mysql";
const app = express()

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'listatareasbdd',
  multipleStatements: true
});

connection.query('SELECT contenido FROM tarea', function (error, results, fields) {
    if (error) throw error;
    results.forEach(tarea => {
        tareas.push(tarea.contenido)
    })
    console.log('Se ha desplegado la información correctamente.');
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

let tareas = []
let alerta = ''

app.get('/', (req, res) => {
    res.render('lista', {
        tareasRegistradas: tareas, 
        mensajeAlerta: alerta
    })
})

app.post('/agregarTarea', (req, res) => {
    let tareaRepetida = false
    tareas.forEach(tarea => {
        if (tarea === req.body.tareaFormulario)
            tareaRepetida = true
    })
    
    if (!tareaRepetida) {
        tareas.push(req.body.tareaFormulario)
        const sql = 'INSERT INTO tarea VALUES ("", ?)'
        connection.query(sql, [req.body.tareaFormulario], function (error, results, fields) {
            if (error) throw error;
            console.log('Se ha registrado la tarea correctamente.');
        });
    }
    else alerta = '<div id="alerta">No se pueden agregar tareas repetidas.</div>'

    res.redirect('/')
})

app.post('/eliminarTarea', (req, res) => {
    let listaEliminar = []
    let sql = ''

    for (let i = 0; i < tareas.length; i++)
        if (req.body['c' + i] === 'on') {
            listaEliminar.push(i)
            sql += `DELETE FROM tarea WHERE contenido="${tareas[i]}"; `
        }
    
    let numElementosEliminados = 0
    listaEliminar.forEach(indiceEliminar => {
        tareas.splice(indiceEliminar - numElementosEliminados, 1)
        numElementosEliminados++
    })

    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log('Se ha eliminado la(s) tarea(s) correctamente.');
    });

    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Conectado en el puerto', 3000)
})