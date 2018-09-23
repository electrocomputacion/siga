import { Meteor } from 'meteor/meteor';
import { Projects } from '../lib/collections/projects';

Meteor.publish('projects', function projectsPublication()
{
	// userId nos la da account ui
	return Projects.find({owner: this.userId});		//publicacion en el servidor
});
/*Meteor.publish('users', function alumnoPublication()
{
	// userId nos la da account ui..
	return Meteor.users.find();		//publicacion en el servidor
});*/
