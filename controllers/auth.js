const { request, response } = require("express");
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { genJWT } = require("../helpers/gen-jwt");



const login = async(req=request,res=response) =>{

    const {email,password} = req.body;

    try {

        const user = await User.findOne({email});
        if (!user || user.status === false){
            return res.status(400).json({
                msg: 'No existe usuario con ese correo'
            })
        }

        const validPassword = bcrypt.compareSync(password,user.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'Contraseña inválida'
            })
        }

        const token = await genJWT(user.id);

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

module.exports = {
    login
}