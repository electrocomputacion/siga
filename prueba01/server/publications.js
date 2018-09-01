import { Meteor } from 'meteor/meteor';
import { Projects } from '../lib/collections/projects';

Meteor.publish('projects', function projectsPublication()
{
	// userId nos la da account ui
	return Projects.find({owner: this.userId});		//publicacion en el servidor
});
Meteor.publish('alumno', function alumnoPublication()
{
	// userId nos la da account ui
	return Alumno.find({owner: this.userId});		//publicacion en el servidor
});
