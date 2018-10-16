import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Alumno} from '../../../lib/collections/alumno'
import { Tutor } from '../../../lib/collections/tutor';
///////////////////////////////////////////////////
/*Template.alumnoForm.helpers({       //helper que le asigna los atributos al input del EasySearch
  inputAttributes: () => {
    return {
      class:'form-control',
      placeholder: 'Ingrese el DNI del Tutor',
      type: 'String',
      id:'dni_tutor',
    }
  },
})*/
//////////////////////////////////////////////////
//console.log(tutor.name);
Template.alumnoForm.events({

  "submit #crearAlumno": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
     var newAlumno= new Object();
     //var tutores= new Object();
     newAlumno.name=target.name.value;     //se alamcena el contenido del input en una variable
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
     /*Meteor.call("new_alumno", newAlumno, function(error, result){  //llamo al metedo que crea el usuario del lado servidor
       if(error){
         alert(error.message);
         console.log("error", error);
         console.log("result",result); //en caso de error tengo que definir una funcion
       }
       if(result){
         console.log("result",result);

        Router.go('profile'); //al crear el usuario devuelvo el perfil creado
       }
     });*/
     //////////////////////////////
     //console.log(dni_tutor);
     //console.log(tutor);
     //console.log(tutor._id);
     //console.log("entro a la funcion");
     //var nombre = "hola";
//    var tutores= new Object();
//tutores.id=tutor._id;
//console.log(tutores);
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
/*Template.alumnoForm.helpers({
  settings: function() {
    return {
      position: "top",
      limit: 5,
      rules: [
        {
          token:'',
          collection: Tutor,
          field: "dni",
          template: Template.autocomplete_tutor
        }
      ]
    };
  }
});*/
Template.alumnoForm.rendered = function() {
  Meteor.typeahead.inject();
};
Template.alumnoForm.helpers({
  tutor: function() { return Tutor.find().fetch().map(
      function(it){return it.dni;});
}
});

//////////////////////////////////
