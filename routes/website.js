const { Router } = require('express');

const router = Router();

router.get('/login', (req,res)=>{
    res.sendFile(process.public_folder  + 'login.html');
})
router.get('/signin', (req,res)=>{
    res.sendFile(process.public_folder  + 'signin.html');
})
router.get('/restore', (req,res)=>{
    res.sendFile(process.public_folder  + 'restore.html');
})
router.get('/home', (req,res)=>{
    res.sendFile(process.public_folder  + 'home.html');
})
router.get('*', (req, res) => {
    res.sendFile(process.public_folder  + '404.html');
})

module.exports = router;