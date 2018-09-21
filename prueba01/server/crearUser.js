Meteor.methods({
  'new_user':function(usuario){

  id = Accounts.createUser({
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
//////////////////////////////////////
//tengo que ver como recupertar el id del usuario creado x nombre o x dni o x correo
//////////////////////////////////////
  // Need _id of existing user record so this call must come
  // after `Accounts.createUser` or `Accounts.onCreate`
  Roles.addUsersToRoles(id, usuario.cargo_roles, 'default-group');
//////////////////////////////////////
     //return usuario.email;
     return usuario.dni;
     console.log(id);
  } //sin de la funcion
}); //fin del metodo
