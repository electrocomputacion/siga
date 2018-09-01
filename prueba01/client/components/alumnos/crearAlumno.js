import {Projects} from '../../../lib/collections/alumno';
import {Router} from 'meteor/iron:router';
import {AutoForm}	from 'meteor/aldeed:autoform';

Template.crearAlumno.helpers({
	formCollection(){
		return Alumno;
	}
})

Template.projectsForm.onCreated(function(){		//espera a q este terminado el template
	AutoForm.addHooks(['alumnoForm'],{
		onSuccess: function(operation, result, template)	//aca se pasan parametros que no hacen nada aun
		{
			Router.go('/projects');
			//console.log(a);
		}
	});
})
