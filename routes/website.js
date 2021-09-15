const { Router } = require('express');

const router = Router();

router.get('/login', (req,res)=>{
    res.sendFile(__dirname.substring(0, __dirname.indexOf("\\routes")) + '/public/login.html');
})
router.get('/signin', (req,res)=>{
    res.sendFile(__dirname.substring(0, __dirname.indexOf("\\routes")) + '/public/signin.html');
})
router.get('/restore', (req,res)=>{
    res.sendFile(__dirname.substring(0, __dirname.indexOf("\\routes")) + '/public/restore.html');
})
router.get('/home', (req,res)=>{
    res.sendFile(__dirname.substring(0, __dirname.indexOf("\\routes")) + '/public/home.html');
})
router.get('*', (req, res) => {
    res.sendFile(__dirname.substring(0, __dirname.indexOf("\\routes")) + '/public/404.html');
})

module.exports = router;