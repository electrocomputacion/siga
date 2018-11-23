import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {Alumno} from '../../../lib/collections/alumno'
import { Curso } from '../../../lib/collections/curso'
import{ RelAlumnCurso } from '../../../lib/collections/relalumncurso'

Template.AsignAlmCurso.rendered = function() {
  let dni = Session.get("dni");
  if (dni) {
    $('#dni_alumno').val(dni);
    Session.set("dni", 0);
  }
  Meteor.typeahead.inject();
};
Template.AsignAlmCurso.helpers({
  alumno: function() {
    return Alumno.find().fetch().map(
      function(it) {
        console.log("esto es el it", it);
        var prueba = it.dni + " " + it.surname + " " + it.name;
        return prueba;
        //return it.dni;
      });
  }
});
Template.AsignAlmCurso.events({
  "submit #AsignCurso": function(event, template) { //captura el evento submit del formulario
    event.preventDefault();
    const target = event.target;
    var newRelacion = new Object(); //creo un objeto para almacenar los valores del formulario
    newRelacion.curso = target.curso.value;
    var input_dni = target.dni_alumno.value.split(" ");
    newRelacion.alumno = input_dni[0]; //tomo solo el dni del input para hacer la consulta
    console.log("dni alumno", newRelacion.alumno);
    //newRelacion.alumno=target.dni_alumno.value;
    newRelacion.fecha = target.fecha.value;
    let alumno = Alumno.find({
      "dni": newRelacion.alumno
    }).count();
    console.log("cuenta", alumno);
    ////////////////////////////////////
    if (alumno) {
      let idAlumno = Alumno.findOne({
        "dni": newRelacion.alumno
      });
      newRelacion.id = idAlumno._id; //guardo el id del alumno a asignar
      console.log("objeto alumno", idAlumno);
      console.log("id del alumno", newRelacion.id);
      RelAlumnCurso.insert({
        alumno: newRelacion.id,
        curso: newRelacion.curso,
        fecha: newRelacion.fecha,
      })
      alert("Se ha asignado el alumno");
      $('#AsignCurso')[0].reset();
    } //fin de la consulta del alumno
    else {
      alert("Debe inscribir al Alumno primero");
      Session.set("formulario", 1);
      Router.go('alumnoForm');
    }
  }
})
