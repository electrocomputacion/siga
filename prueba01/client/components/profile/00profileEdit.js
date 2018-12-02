/*import {mongo} from 'meteor/mongo';
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
     Meteor.users.update(Meteor.userId(), {$set:{       //actualizo los datos de la coleccion
       "profile.name":ingresoNombre}});
       Meteor.users.update(Meteor.userId(), {$set:{       //esto se puede hacer de una sola, ver como
         "profile.surname":ingresoApellido}});
         Meteor.users.update(Meteor.userId(), {$set:{
           "profile.address":ingresoDireccion}});
Router.go('profile');                                   // le digo que una vez termine vuelva al profile
  },
});
*/
