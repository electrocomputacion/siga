import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {Alumno} from '../../../lib/collections/alumno'
import { Curso } from '../../../lib/collections/curso'
import{ RelAlumnCurso } from '../../../lib/collections/relAlumCurso'

Template.AsignAlmCurso.rendered = function() {
  Meteor.typeahead.inject();
};
Template.AsignAlmCurso.helpers({
  alumno: function() { return Alumno.find().fetch().map(
      function(it){ return it.dni;});
}
});
Template.AsignAlmCurso.events({
"submit #AsignCurso": function(event, template){   //captura el evento submit del formulario
   event.preventDefault();
   const target=event.target;
   var newRelacion= new Object();     //creo un objeto para almacenar los valores del formulario
   newRelacion.curso=target.curso.value;
   newRelacion.alumno=target.dni_alumno.value;
   newRelacion.fecha=target.fecha.value;
   let alumno=Alumno.find({"dni":newRelacion.alumno}).count();
   ////////////////////////////////////
if(alumno){
RelAlumnCurso.insert({
  alumno:newRelacion.alumno,
  curso:newRelacion.curso,
  fecha:newRelacion.fecha,
})
alert("Se ha asignado el alumno");
$('#AsignCurso')[0].reset();
}//fin de la consulta del alumno
else{
  alert("Debe inscribir al Alumno primero");
  Session.set("formulario",1);
  Router.go('alumnoForm');
}
}
})
