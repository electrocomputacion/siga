import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { $ } from 'meteor/jquery';
//import 'bootstrap/dist/js/bootstrap.bundle';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
/////////////////////////////////

/////////////////////////////
/*var cuenta=Meteor.users.find().count();
console.log(cuenta);
  if (cuenta===0){

    console.log("dentro del if cliente");
    var admin = new Object();
    admin.name="Admin User";
    admin.email="prueba@prueba.com";
    admin.password="123456";
    admin.roles="admin";
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

  Meteor.call("adminCreation", admin, function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){
       Router.go('profile');
    }
  });
}
});
Meteor.users.find().count()*/
