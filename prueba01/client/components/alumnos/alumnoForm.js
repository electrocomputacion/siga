import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Alumno} from '../../../lib/collections/alumno'
import { Tutor } from '../../../lib/collections/tutor'

//tengo que agregar el control por roles
Template.alumnoForm.events({
  "submit #crearAlumno": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
     var newAlumno= new Object();     //creo un objeto para almacenar los valores del formulario
     newAlumno.name=target.name.value;     //se alamcena el contenido del input en una objeto
     newAlumno.surname=target.surname.value;
     newAlumno.dni=target.dni.value;
     newAlumno.address=target.address.value;
     newAlumno.fech_nac=target.fech_nac.value;
     newAlumno.legajo=target.legajo.value;
     newAlumno.grupo_sang=target.grupo_sang.value;
     newAlumno.esc_origen=target.esc_origen.value;
     var dni_tutor=target.dni_tutor.value;
     tutor=Tutor.findOne({"dni":dni_tutor});
     console.log(tutor._id);
     newAlumno.tutores=tutor._id;
     //console.log(tutores);
     console.log(newAlumno);
     ////////////////////////////////////
  Alumno.insert({
    name:newAlumno.name,     //se alamcena el contenido del input en una variable
    surname:newAlumno.surname,
    dni:newAlumno.dni,
    address:newAlumno.address,
    fech_nac:newAlumno.fech_nac,
    legajo:newAlumno.legajo,
    grupo_sang:newAlumno.grupo_sang,
    esc_origen:newAlumno.esc_origen,
    tutores:newAlumno.tutores,
})
Router.go('profile');
  },
});
//////////////////////////////////
Template.alumnoForm.rendered = function() {
  Meteor.typeahead.inject();
};
Template.alumnoForm.helpers({
  tutor: function() { return Tutor.find().fetch().map(
      function(it){return it.dni;});
}
});

//////////////////////////////////
