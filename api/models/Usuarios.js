/**
 * Usuarios.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema:true,
  attributes: {
    nombre:{
      type:'string',
      required:true
    },
    apellidoPaterno:{
      type:'string',
      required:true
    },
    apellidoMaterno:{
      type:'string'
    },
    genero:{
      type:'string',
      enum:['hombre','mujer']
    },
    estadoCivil:{
      type:'string',
      enum:['soltero','casado','divorciado','viudo']
    },
    fechaNacimiento:{
      type:'date'
    }

  }
};

