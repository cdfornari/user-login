const Role = require('../models/role');
const User = require('../models/user');

const validRole = async (role='') =>{
    const RoleExists = await Role.findOne({role})
    if (!RoleExists){
        throw new Error(`El rol ${role} no es válido`);
    }
}

const emailExists = async (email='')=>{
    const emailExists = await User.findOne({email});
    if (emailExists){
        throw new Error(`el email ${email} ya está en uso`)
    }
}

const userIdExists = async (id)=>{
    const userExists = await User.findById(id);
    if (!userExists){
        throw new Error(`El ID no existe`)
    }
}

module.exports = {
    validRole,
    emailExists,
    userIdExists
}