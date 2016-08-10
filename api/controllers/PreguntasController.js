/**
 * PreguntasController
 *
 * @description :: Server-side logic for managing preguntas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create:function(req,res){
		var data = req.body;
		Preguntas.create(data).exec(function(error,pregunta){
			if(error){
				return res.badRequest();
			}
			sails.sockets.broadcast('preguntas-'+pregunta.encuesta,'preguntas-'+pregunta.encuesta, pregunta);

			return res.json(pregunta);
		});
	},

	getEncuesta:function(req,res){
		var encuesta = req.param('id');
		if(req.isSocket){
			console.log('is socket');
			sails.sockets.join(req,'preguntas-'+encuesta,function(error){
				if(!error){
					console.log('Socket room: preguntas-'+encuesta);
				}
			});
		}
		
		Preguntas.find({encuesta:encuesta}).populate('respuestas').exec(function(error,preguntas){
			res.json(preguntas);
		});
	}
};

