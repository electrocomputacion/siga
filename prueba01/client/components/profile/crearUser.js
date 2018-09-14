import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor';

Template.crearUser.events({

  "submit #crearUsuario": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
var usuario= new Object();
     /////////////////////////
     usuario.name=target.name.value;     //se alamcena el contenido del input en una variable
      usuario.surname=target.surname.value;
      usuario.address=target.address.value;
      usuario.dni=target.dni.value;
      usuario.phone=target.phone.value;
      usuario.email=target.email.value;
////////////////////////////////
     Meteor.call("new_user", usuario, function(error, result){
       if(error){
         console.log("error", error);
       }
       if(result){
        Router.go('profile');
       }
     });
     /////////////////////////////
    /* var ingresoNombre=target.name.value;     //se alamcena el contenido del input en una variable
     var ingresoApellido=target.surname.value;
     var ingresoDireccion=target.address.value;
     var ingresoDni=target.dni.value;
     var ingresoPhone=target.phone.value;
     var ingresoEmail=target.email.value;
     //console.log("entro a la funcion");
     //var nombre = "hola";*/

                                        // le digo que una vez termine vuelva al profile
    /*Accounts.createUser({
			email: ingresoEmail,
			password: ingresoDni,
			profile: {
				name:  ingresoNombre,
				surname: ingresoApellido,
        address: ingresoDireccion,
        phone: ingresoPhone,
        dni: ingresoDni,

			},

    });*/


  },
});
