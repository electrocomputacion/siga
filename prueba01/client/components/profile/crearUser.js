import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor';

Template.crearUser.events({

  "submit #crearUsuario": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
var usuario= new Object();          //usuario es un objeto q contendra toda la info de usuario
//////////////////////////////////////////////////
      usuario.name=target.name.value;     //se alamcena el contenido del input en una variable
      usuario.surname=target.surname.value;
      usuario.address=target.address.value;
      usuario.dni=target.dni.value;
      usuario.phone=target.phone.value;
      usuario.email=target.email.value;
      usuario.cargo_roles=target.cargo_roles.value;
//////////////////////////////////////////////////
     Meteor.call("new_user", usuario, function(error, result){  //llamo al metedo que crea el usuario del lado servidor
       if(error){
         alert(error.message);
         console.log("error", error);
         console.log("result",result); //en caso de error tengo que definir una funcion
       }
       if(result){
         console.log("result",result);

        Router.go('profile'); //al crear el usuario devuelvo el perfil creado
       }
     });


  },
});
Template.crearUser.onRendered(function(){
  //$("#dni").inputmask("99999999");
  $("#dni").inputmask("9999999[9]"); //mask with dynamic syntax

})
