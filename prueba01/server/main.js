import { Meteor } from 'meteor/meteor';
/*Meteor.methods({

  'adminCreation':function(admin){
    console.log("dentro del metodo en servidor");
  id = Accounts.createUser({      //guardo en id el "id" del usuario que se crea
      email: admin.email,
      password: admin.password,
      profile: {
        name:  admin.name,
      }
    });//fin de la Account
  Roles.addUsersToRoles(id, admin.roles);    //asigno el rol al usuario creado con el id asignado
  console.log(id);
     return id;

   }  //fin de la funcion
});*/
Meteor.startup(() => {
Accounts.config({
// enable client user creation
forbidClientAccountCreation: false,
})
var cuenta=Meteor.users.find().count(); //guardo el total de usuarios creados
console.log(cuenta);//pa
  if (cuenta===0){      //si no existe ningun usuario crea el super user y le asigna el rol admin
    console.log("dentro del if servidor");
    /*var admin = new Object();
    admin.name="Admin User";
    admin.email="prueba@prueba.com";
    admin.password="123456";
    admin.roles="admin";*/
    id = Accounts.createUser({      //guardo en id el "id" del usuario que se crea
        email: "prueba@prueba.com",
        password: "123456",
        profile: {
          name:  "Admin User",
        }
      });//fin de la Account
    Roles.addUsersToRoles(id, "admin");    //asigno el rol al usuario creado con el id asignado
    console.log(id);
       return id;
  }     //fin del if
})
