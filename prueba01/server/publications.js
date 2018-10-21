import { Meteor } from 'meteor/meteor';
import { Projects } from '../lib/collections/projects';
import {Tutor} from '../lib/collections/tutor';
import {Curso} from '../lib/collections/curso';
Meteor.publish('projects', function projectsPublication()
{
	// userId nos la da account ui
	return Projects.find({owner: this.userId});		//publicacion en el servidor
});
Meteor.publish('tutor', function tutorPublication(){

	//return Tutor.find({owner: this.userId});
	return Tutor.find({});

});
Meteor.publish('curso', function cursoPublication(){

	//return Tutor.find({owner: this.userId});
	return Curso.find({});

});
/*Meteor.publish('users', function alumnoPublication()
{
	// userId nos la da account ui..
	return Meteor.users.find();		//publicacion en el servidor
});*/
