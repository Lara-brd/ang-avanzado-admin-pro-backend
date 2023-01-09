const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String,

    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false,
    },


});

//linando elementos y cambiando id -> _id también está bien es a nuestra discreción
//usamos función normal para que tome el this del objeto
UsuarioSchema.method('toJSON', function (){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);