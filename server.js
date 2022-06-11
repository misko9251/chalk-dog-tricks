const express = require('express')
const app = express()
const PORT = 4000
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const res = require('express/lib/response')
const mongo = 'mongodb+srv://misko9251:rangers30@cluster0.nbxrnwn.mongodb.net/?retryWrites=true&w=majority'

let db

MongoClient.connect(mongo, { useUnifiedTopology: true}) 
    .then(client=>{
        console.log('Connected to Database')
        db = client.db('chalktricks')        
})

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('tricks').find().toArray().then(results => {
        db.collection('learning').find().toArray().then(results2 => {
            response.render('index.ejs', {names: results, names2: results2})
        })
    })
})

app.post('/addTrick', (request, response)=>{
    db.collection('tricks').insertOne({tricksWeKnow: request.body.tricksWeKnow.toUpperCase()})
    .then(result =>{
        response.redirect('/')
    })
    .catch(error => console.log(error))
})

app.post('/addTrick2', (request, response)=>{
    db.collection('learning').insertOne({weAreLearning: request.body.weAreLearning.toUpperCase()})
    .then(result =>{
        response.redirect('/')
    })
    .catch(error => console.log(error))
})

app.delete('/deleteKnown', (request, response) => {
    db.collection('tricks').deleteOne({tricksWeKnow: request.body.trickToDelete})
    .then(result => {
        console.log('Trick Deleted')
        console.log(request.body)
        response.json('OK')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteLearning', (request, response) => {
    db.collection('learning').deleteOne({weAreLearning: request.body.removeTrick})
    .then(result => {
        console.log('Trick Deleted')
        console.log(request.body)
        response.json('OK')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log('Sever is running')
})