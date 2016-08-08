/**
 * Encuestas.js
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
    descripcion:{
      type:'string'
    },
    disponible:{
      type:'boolean',
      defaultsTo:false
    },
    codigo:{
      type:'string'
    },
    fechaInicio:{
      type:'date'
    },
    fechaTermino:{
      type:'date'
    },
    preguntas:{
      collection:'preguntas',
      via:'encuesta'
    }
  },
  beforeCreate:function(values, cb){
    values.codigo = new Date().getTime().toString(32);
    cb();
  }
};

