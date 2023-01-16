const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img:{
        type: String,

    },
    //el usuario que se ha signado:
    usuario: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' });

//linando elementos y cambiando id -> _id también está bien es a nuestra discreción
//usamos función normal para que tome el this del objeto
HospitalSchema.method('toJSON', function (){
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema);