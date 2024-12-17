const express = require('express')
require('dotenv').config()

const pageRouter = require('./routes/page')
const emailRouter = require('./routes/email')

const app = express()


app.use(express.static('public'))
app.use(express.json());  
// Set EJS as the view engine
app.set('view engine', 'ejs')

// Set the directory for views (default is './views')
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

app.use('/', pageRouter)


//EMAIL SERVICES
// Handle the form submission for flight booking and Contact us
app.use('/', emailRouter)


app.get('test', (req, res) => {
    res.send('chicking')
})

const port = process.env.PORT || 3000
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})