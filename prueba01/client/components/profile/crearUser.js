import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'

Template.crearUser.events({

  "submit #crearUsuario": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
     var ingresoNombre=target.name.value;     //se alamcena el contenido del input en una variable
     var ingresoApellido=target.surname.value;
     var ingresoDireccion=target.address.value;
     var ingresoDni=target.dni.value;
     var ingresoPhone=target.phone.value;
     var ingresoEmail=target.email.value;
     console.log("entro a la funcion");
     //var nombre = "hola";

     //Router.go('profile');                                   // le digo que una vez termine vuelva al profile
    Accounts.createUser({
			email: ingresoEmail,
			password: ingresoDni,
			profile: {
				name_first:  ingresoNombre,
				name_last: ingresoApellido,
        address: ingresoDireccion,
        phone: ingresoPhone,
        dni: ingresoDni,

			},

    });


  },
});
