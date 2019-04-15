import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { Projects, ProjectsIndex } from '../lib/collections/projects';
import { Alumno } from '../lib/collections/alumno';
import { Tutor } from '../lib/collections/tutor';
import { Curso } from '../lib/collections/curso';
import { Notas } from '../lib/collections/notas';
import { RelAlumnCurso } from '../lib/collections/relalumncurso';

Router.onBeforeAction(function(){		//Controla que no se pueda ingresar si no se esta logeado
	if (! Meteor.userId()){
		Router.go('home');
		this.next();
	}
	else {
		if(Router.current().route.getName()==='home'){	//si la ruta actual es home y el usuario ya esta logeado, lo saca de la pagina de loggin y lo lleva a proyectos

			Router.go('profile');
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
					function() { return Meteor.subscribe('relalumncurso'); },
					function () { return Meteor.subscribe("roles");	},
					function () { return Meteor.subscribe("notas");	},

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
Router.route('/doc_mat_tabla',{
	waitOn: function(){
											return[
												function () { return Meteor.subscribe("relmatdocente");	},
												function () { return Meteor.subscribe("materia"); },
												function () { return Meteor.subscribe("curso"); },
												function () { return Meteor.subscribe("users"); },
											];
										},

	name:'doc_mat_tabla',
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
				id:Meteor.userId(), // ver porq no funciona si hay mas de un usuario
				//profile:Meteor.users.findOne({_id:Meteor.userId()}).profile,
				//email:Meteor.users.findOne({_id:this.userId}).email[0].address,
			//	email: Meteor.users.findOne(_id:this.userId).emails[0].address,
				//profile: Meteor.user().profile
			}
		}
	}
})
Router.route('/crearUser',function(){
	//var user=this.userId;
	let user=Meteor.userId();
	var usuario=Roles.userIsInRole(user,['admin']);
	if(usuario){
		this.render('crearUser')
	}
	else{
		this.render('profile')				//si no esta autorizado no puede crear perfil
	}
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
Router.route('/materiaForm',{
	name: 'materiaForm',
	data: {		//data es un objeto que contendra los datos que queremos obtener de proyectos en el template
		curso(){											//contiene todos los cursos disponibles
				let curso=Curso.find({});
				//console.log(curso);
				return curso;
		}
	}

})
Router.route('/tablaAlumno',{
	//name: 'tablaAlumno',
	loadingTemplate: 'loading',
	waitOn: function(){
											return [
												function() { return Meteor.subscribe('alumno'); },
												function() { return Meteor.subscribe('relalumncurso'); },
												function () { return Meteor.subscribe('notas');	},
												function() { return Meteor.subscribe('curso'); },
												function() { return Meteor.subscribe('materia'); },
											]
	},
	action: function(){
		this.render('tablaAlumno');
	},
})
Router.route('/materiaDocente',{
	loadingTemplate:'loading',
	waitOn: function(){
											return[
												function(){return Meteor.subscribe('materia');},
												function(){return Meteor.subscribe('docentes')},
												function(){return Meteor.subscribe('curso')},
												function(){return Meteor.subscribe('relmatdocente')},
											]
	},
	data: {		//data es un objeto que contendra los datos que queremos obtener de proyectos en el template
		docente(){											//contiene todas las materias
			let usuarios=Meteor.users.find({});
			return usuarios;
			}
	},
	action: function(){
		this.render('materiadocente');
	},
})

Router.route('/prueba',{
	loadingTemplate:'loading',
	waitOn: function(){
											return[
												function(){return Meteor.subscribe('materia');},
												function(){return Meteor.subscribe('docentes')},
											]
	},
	data: {		//data es un objeto que contendra los datos que queremos obtener de proyectos en el template
		usuarios(){											//contiene todas las materias
				let usuarios=Meteor.users.find({});
				return usuarios;
		}
	},
	action: function(){
		this.render('prueba');
	},
})
Router.route('/login',{
	name: 'login',
})
Router.route('/misMaterias',{
	waitOn: function(){
											return[
												function(){return Meteor.subscribe('materia');},
												function(){return Meteor.subscribe('docentes')},
												function(){return Meteor.subscribe('curso')},
												function(){return Meteor.subscribe('relmatdocente')},
											]
	},
	name: 'misMaterias',
})
