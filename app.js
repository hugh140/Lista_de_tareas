import express from "express";
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

let tareas = []

app.get('/', (req, res) => {
    res.render('lista', {tareasRegistradas: tareas})
})

app.post('/', (req, res) => {
    tareas.push(req.body.tareaFormulario)
    console.log(tareas)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Conectado en el puerto', 3000)
})