const { request, response } = require("express");
const path = require('path')
const fs = require('fs')

const {subirArchivo} = require('../helpers')
const { User,Producto } = require('../models')



const cargarArchivo = async(req=request,res=response)=>{

    try {
        const fileName = await subirArchivo(req,undefined,'imgs')

        res.json({
            fileName
        })
    } catch (msg) {
        res.status(400).json({msg})
    }
       
}

const updateImg = async(req=request,res=response) =>{

    const {id,coleccion} = req.params;

    let model;

    switch (coleccion) {

        case 'users':

            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'No existe usuario con ese id'
                })
            }

        break;

        case 'productos':

            model = await Producto.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'No existe producto con ese id'
                })
            }

        break;
    
        default:
            return res.status(500).json({msg: 'Fallo en validación de colección'})
    }

    if (model.img){
        const pathImg = path.join(__dirname,'../uploads',coleccion,model.img)
        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg);
        }
    }
 

    model.img = await subirArchivo(req,undefined,coleccion);

    await model.save()

    res.json({model})
}

const getImg = async(req=request,res=response)=>{

    const {id,coleccion} = req.params;

    let model;

    switch (coleccion) {

        case 'users':

            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'No existe usuario con ese id'
                })
            }

        break;

        case 'productos':

            model = await Producto.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'No existe producto con ese id'
                })
            }

        break;
    
        default:
            return res.status(500).json({msg: 'Fallo en validación de colección'})
    }

    if (model.img){
        const pathImg = path.join(__dirname,'../uploads',coleccion,model.img)
        if(fs.existsSync(pathImg)){
            return res.sendFile(pathImg)
        }
    }
 
    res.sendFile(path.join(__dirname,'../assets','no-image.jpg'))
}

module.exports = {
    cargarArchivo,
    updateImg,
    getImg
}