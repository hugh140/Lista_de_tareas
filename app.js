import express from "express";
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('lista.ejs', {vari: 'Hugo'})
})

app.listen(3000, '192.168.100.13', () => {
    console.log('Conectado en el puerto', 3000)
})