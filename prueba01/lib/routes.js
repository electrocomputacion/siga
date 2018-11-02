import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { Projects, ProjectsIndex } from '../lib/collections/projects';
import { Alumno } from '../lib/collections/alumno';
import { Tutor } from '../lib/collections/tutor';
import { Curso } from '../lib/collections/curso';

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
	waitOn:function() {
			 	return [
					function() { return Meteor.subscribe('projects'); },
				 	function() { return Meteor.subscribe('alumno'); },
				 	function() { return Meteor.subscribe('tutor'); },
					function() { return Meteor.subscribe('curso'); },

			 	];
	},
});

Router.route('/', {
	name: 'home'
})

Router.route('/projects',{
	name :'projects',
	data: {		//data es un objeto que contendra los datos que queremos obtener de proyectos en el template
		projects(){
			//return Projects.find() //solo devolvera los proyectos del usuario logeado (control echo en publications)
				console.log(ProjectsIndex);
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
Router.route('/alumnoForm',{
	name: 'alumnoForm',
})
Router.route('/tutor_form',{
	name: 'tutor_form',
})
Router.route('/cursos_form',{
	name: 'cursos_form',
})

Router.route('/AsignAlmCurso',{
	name: 'AsignAlmCurso',
	data: {		//data es un objeto que contendra los datos que queremos obtener de proyectos en el template
		curso(){											//contiene todos los cursos disponibles
				let curso=Curso.find({});
				//console.log(curso);
				return curso;
		}
	}

})
Router.route('/tablaAlumno',{
	name: 'tablaAlumno',
})
