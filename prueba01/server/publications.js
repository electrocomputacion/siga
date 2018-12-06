import { Meteor } from 'meteor/meteor';
import { Projects } from '../lib/collections/projects';
import {Tutor} from '../lib/collections/tutor';
import {Curso} from '../lib/collections/curso';
import {Alumno} from '../lib/collections/alumno';
import {Notas} from '../lib/collections/notas';
import {RelAlumnCurso} from '../lib/collections/relalumncurso';
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
Meteor.publish('alumno', function alumnoPublication(){
var usuario=Roles.userIsInRole(this.userId,['docente','admin']);
	if (usuario){
	//return Tutor.find({owner: this.userId});
	return Alumno.find({});
}
});
Meteor.publish('curso', function cursoPublication(){

	//return Tutor.find({owner: this.userId});
	return Curso.find({});

});
//if (Roles.userIsInRole(loggedInUser, ['admin','vice_director'])){
Meteor.publish('relalumncurso', function relalumncursoPublication(){
	return RelAlumnCurso.find({});//preguntar si esto funciona
});
Meteor.publish("roles", function (){
    return Meteor.roles.find({});
});
Meteor.publish('notas', function notasPublication(){
	return Notas.find({});//preguntar si esto funciona
});
//}
/*Meteor.publish('users', function alumnoPublication()
{
	// userId nos la da account ui..
	return Meteor.users.find();		//publicacion en el servidor
});*/
