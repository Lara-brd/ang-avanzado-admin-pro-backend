const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img:{
        type: String,

    },
    //el usuario que se ha signado:
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required:true
    },

});

//linando elementos y cambiando id -> _id también está bien es a nuestra discreción
//usamos función normal para que tome el this del objeto
MedicoSchema.method('toJSON', function (){
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Medico', MedicoSchema);