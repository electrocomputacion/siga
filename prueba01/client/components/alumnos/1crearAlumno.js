import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'

Template.crearUser.events({

  "submit #crearAlumno": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
     var ingresoNombre=target.name.value;     //se alamcena el contenido del input en una variable
     var ingresoApellido=target.surname.value;
     var ingresoDni=target.dni.value;
     var ingresoDireccion=target.address.value;
     var ingresoFecha=target.fech_nac.value;
     var ingresoLegajo=target.legajo.value;
     var ingresoGrupo_sang=target.grupo_sang.value;
     var ingresoEsc=target.esc_origen.value;
     console.log("entro a la funcion");
     //var nombre = "hola";

                                        // le digo que una vez termine vuelva al profile


Router.go('crearAlumno');
  },
});
