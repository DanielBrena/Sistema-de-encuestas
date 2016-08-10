/**
 * RespuestasController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getPregunta:function(req,res){
		var pregunta = req.param('id');
		Respuestas.find({pregunta:pregunta}).exec(function(error,respuestas){
			res.json(respuestas);
		});
	}
};

