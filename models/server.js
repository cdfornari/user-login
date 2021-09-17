const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config');

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            busquedas: '/api/search'
        }

        this.connectDB();

        this.middlewares();
        
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.busquedas,require('../routes/busquedas'))
        this.app.use(require('../routes/website'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;