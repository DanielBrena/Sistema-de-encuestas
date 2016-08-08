/**
 * Preguntas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema:true,
  attributes: {
    texto:{
      type:'string',
      required:true
    },
    categoria:{
      model:'categorias'
    },
    encuesta:{
      model:'encuestas'
    },
    tipo:{
      type:'string',
      enum:['abierta','cerrada']
    },
    respuestas:{
      collection:'respuestas',
      via:'pregunta'
    }
    
  }
};

