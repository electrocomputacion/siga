Meteor.methods({
  'new_user':function(usuario){
    var loggedInUser = Meteor.user(); //meteodo que crea el usuario con los datos del formulario
////////////////////////7
if (Roles.userIsInRole(loggedInUser, ['admin'])) {
  id = Accounts.createUser({      //guardo en id el "id" del usuario que se crea
      email: usuario.email,
      password: usuario.dni,
      profile: {
        name:  usuario.name,
        surname: usuario.surname,
        address: usuario.address,
        phone: usuario.phone,
        dni: usuario.dni,
      }
    });//fin de la Account
  Roles.addUsersToRoles(id, usuario.cargo_roles);    //asigno el rol al usuario creado con el id asignado
  console.log(id);
     return id;
  } //sin de la funcion



  else {
    throw new Meteor.Error(403, "No esta Autorizado a crear Usuarios");
  }
}
////////////////////

}); //fin del metodo
