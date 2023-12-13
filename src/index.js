import express from 'express'

const App = express()

App.get('/', (req, res) => res.send('holo'))

App.listen(3000)
console.log("Server listening on port", 3000)