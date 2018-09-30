/*import {Alumno} from '../../../lib/collections/alumno';
import {Router} from 'meteor/iron:router';
import {AutoForm}	from 'meteor/aldeed:autoform';

Template.alumnoForm.helpers({
	formCollection(){
		return Alumno;
	}
})

Template.alumnoForm.onCreated(function(){		//espera a q este terminado el template
	AutoForm.addHooks(['alumnoForm'],{
		onSuccess: function(operation, result, template)	//aca se pasan parametros que no hacen nada aun
		{
			Router.go('/projects');
			//console.log(a);
		}
	});
})
*/
