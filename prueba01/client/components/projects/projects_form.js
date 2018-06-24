import {Projects} from '../../../lib/collections/projects';
import {Router} from 'meteor/iron:router';
import {AutoForm}	from 'meteor/aldeed:autoform';

Template.projectsForm.helpers({
	formCollection(){
		return Projects;
	}
})

Template.projectsForm.onCreated(function(){		//espera a q este terminado el template
	AutoForm.addHooks(['projectsForm'],{
		onSuccess: function(operation, result, template)	//aca se pasan parametros que no hacen nada aun
		{
			Router.go('/projects');
			//console.log(a);
		}
	});
})