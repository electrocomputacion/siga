import {Tutor} from '../../../lib/collections/tutor';
import {Router} from 'meteor/iron:router';
import {AutoForm}	from 'meteor/aldeed:autoform';

Template.tutorForm.helpers({
	formCollection(){
		return Tutor;
	}
})

Template.tutorForm.onCreated(function(){		//espera a q este terminado el template
	AutoForm.addHooks(['tutorForm'],{
		onSuccess: function(operation, result, template)	//aca se pasan parametros que no hacen nada aun
		{
			Router.go('/projects');
			//console.log(a);
		}
	});
})
