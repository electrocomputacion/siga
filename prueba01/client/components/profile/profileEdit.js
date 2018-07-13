import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'

Template.profileEdit.events({

  "submit #formModificarProfile": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
     var ingresoNombre=target.name.value;     //se alamcena el contenido del input en una variable
     var ingresoApellido=target.surname.value;
     var ingresoDireccion=target.address.value;
     console.log("entro a la funcion");
     //var nombre = "hola";

     //Router.go('profile');                                   // le digo que una vez termine vuelva al profile
    Accounts.createUser({
			email: ingresoNombre,
			password: ingresoApellido,
			profile: {
				name_first:  ingresoNombre,
				name_last: ingresoApellido,

			},

    });


  },
});
