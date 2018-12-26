const mongoose= require ('mongoose');
const {Schema}= mongoose;
const bcrypt = require('bcryptjs');

const UsuarioEsquema= new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    contrasenia: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

UsuarioEsquema.methods.encryptPassword = async (contrasenia) =>{
    const salt = await bcrypt.genSalt(10);
    const hash= bcrypt.hash(contrasenia, salt);
    return hash;
};

UsuarioEsquema.methods.matchPassword = async function (contrasenia) {
    return await bcrypt.compare(contrasenia, this.contrasenia);

};

module.exports= mongoose.model('User', UsuarioEsquema);