Meteor.methods({
  'new_user':function(usuario){ //meteodo que crea el usuario con los datos del formulario

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
//////////////////////////////////////
//tengo que ver como recupertar el id del usuario creado x nombre o x dni o x correo
//////////////////////////////////////
  // Need _id of existing user record so this call must come
  // after `Accounts.createUser` or `Accounts.onCreate`
  Roles.addUsersToRoles(id, usuario.cargo_roles, 'default-group');    //asigno el rol al usuario creado con el id asignado
//////////////////////////////////////
     //return usuario.email;
     return usuario.dni;
     console.log(id);
  } //sin de la funcion
}); //fin del metodo
