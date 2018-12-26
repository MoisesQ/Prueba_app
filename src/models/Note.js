const mongoose= require ('mongoose');
const {Schema}= mongoose;

const NotaEsquema= new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports= mongoose.model('Note', NotaEsquema)