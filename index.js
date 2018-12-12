const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
const pessoas = require('./routes/pessoas')

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'cadastro'
})

const dependencies = {
    connection
}

app.use(bodyParser.urlencoded( { extended : false } ))
app.use(express.static('public'))
app.get('/', (req, res)=> res.render('home'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/pessoas', pessoas(dependencies))
connection.connect(()=>{
    app.listen(port, ()=> console.log('Listering on port:'+port))
})
