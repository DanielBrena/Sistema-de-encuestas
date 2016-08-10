/**
 * Categorias.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema:true,
  attributes: {
    nombre:{
      type:'string',
      required:true,
      unique:true
    },
    descripcion:{
      type:'string'
    },
    encuesta:{
      model:'encuestas'
    }
  }
};

