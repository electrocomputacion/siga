Meteor.methods({
  'new_user':function(usuario){

    Accounts.createUser({
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
     //return usuario.email;
     return "#";
  } //sin de la funcion
}); //fin del metodo
