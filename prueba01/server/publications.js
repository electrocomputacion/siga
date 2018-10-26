import { Meteor } from 'meteor/meteor';
import { Projects } from '../lib/collections/projects';
import {Tutor} from '../lib/collections/tutor';
import {Curso} from '../lib/collections/curso';
import {Alumno} from '../lib/collections/alumno';

//var usuario=Meteor.userId();

Meteor.publish('projects', function projectsPublication()
{
	// userId nos la da account ui
	return Projects.find({owner: this.userId});		//publicacion en el servidor
});
Meteor.publish('tutor', function tutorPublication(){

	//return Tutor.find({owner: this.userId});
	return Tutor.find({});

});
Meteor.publish('alumno', function cursoPublication(){

	//return Tutor.find({owner: this.userId});
	return Alumno.find({});

});
Meteor.publish('curso', function cursoPublication(){

	//return Tutor.find({owner: this.userId});
	return Curso.find({});

});
//if (Roles.userIsInRole(loggedInUser, ['admin','vice_director'])){
Meteor.publish('relAlumCurso', function cursoPublication(){
	return RelAlumnCurso.find({});//preguntar si esto funciona
});
//}
/*Meteor.publish('users', function alumnoPublication()
{
	// userId nos la da account ui..
	return Meteor.users.find();		//publicacion en el servidor
});*/
