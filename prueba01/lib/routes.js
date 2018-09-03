import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { Projects, ProjectsIndex } from '../lib/collections/projects';
import { Alumno } from '../lib/collections/alumno';

Router.onBeforeAction(function(){		//Controla que no se pueda ingresar si no se esta logeado

	if (! Meteor.userId()){
		Router.go('home');
		this.next();
	}
	else {
		if(Router.current().route.getName()==='home'){	//si la ruta actual es home y el usuario ya esta logeado, lo saca de la pagina de loggin y lo lleva a proyectos

			Router.go('projects');
		}
		this.next();
	}
})

Router.configure({

	layoutTemplate: 'baseLayout',

	waitOn: function(){

		return Meteor.subscribe('projects'); //con esto vamos a tener disponibles los proyectos publicados en 'publications' en el cliente
		return Meteor.subscribe('alumno');
	}
})

Router.route('/', {
	name: 'home'
})

Router.route('/projects',{

	name :'projects',
	data: {		//data es un objeto que contendra los datos que queremos obtener de proyectos en el template
		projects(){
			//return Projects.find() //solo devolvera los proyectos del usuario logeado (control echo en publications)
				return ProjectsIndex;
		}
	}
})
Router.route('/projects_form',{
	name:'projects_form'
})

Router.route('/projects/:_id', function(){
	let project = Projects.findOne({_id: this.params._id})
		if (!project){
			Router.go('projects');
		}
		else{
			this.render('project_detail',{
				data:{
					project: project
				}
			})
		}
},{
	name: 'project_detail'

});
Router.route('/profile',{												//esto define la ruta al profile del usuario
	name: 'profile',
	data: {
		user(){
			return{
				id:Meteor.user()._id,
				email: Meteor.user().emails[0].address,
				profile: Meteor.user().profile
			}
		}
	}
})
Router.route('/crearUser',{
	name: 'crearUser',

})
Router.route('/alumno_form',{
	name: 'alumno_form',

})
