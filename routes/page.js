const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.render('index')
    
})

router.get('/about', (req, res)=> {
    res.render('about')
    
})

router.get('/service', (req, res)=> {
    res.render('service')
    
})

router.get('/contactus', (req, res)=> {
    res.render('contactus')
    
})

module.exports = router