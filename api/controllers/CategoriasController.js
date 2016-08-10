/**
 * CategoriasController
 *
 * @description :: Server-side logic for managing categorias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getEncuesta:function(req,res){
		var encuesta = req.param('id');
		Categorias.find({encuesta:encuesta}).exec(function(error,encuestas){
			res.json(encuestas);
		});
	}
};

