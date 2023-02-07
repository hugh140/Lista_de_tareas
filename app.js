import express from "express";
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

let tareas = []

app.get('/', (req, res) => {
    res.render('lista', {tareasRegistradas: tareas})
})

app.post('/agregarTarea', (req, res) => {
    tareas.push(req.body.tareaFormulario)
    res.redirect('/')
})

app.post('/eliminarTarea', (req, res) => {
    let listaEliminar = []

    for (let i = 0; i < tareas.length; i++)
        if (req.body['c' + i] === 'on')
            listaEliminar.push(i)
    
    let numElementosEliminados = 0
    listaEliminar.forEach(indiceEliminar => {
        tareas.splice(indiceEliminar - numElementosEliminados, 1)
        numElementosEliminados++
    })
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Conectado en el puerto', 3000)
})