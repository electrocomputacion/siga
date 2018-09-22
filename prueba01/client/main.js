import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { $ } from 'meteor/jquery';
//import 'bootstrap/dist/js/bootstrap.bundle';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
/////////////////////////////////

/////////////////////////////
Meteor.startup(() => {
  // code to run on server at startup
});

//AL CREAR UN USUARIO DESDE INTERNET LE ASIGNA UN ROL "internet"
/*
    //user.profile = options.profile ? options.profile : {};
    //user.roles = ['internet'];
    //return user
  Accounts.createUser({
    email: email,
    password: password,
    profile:{
      givenName:
    }
  })

})*/
/////////////////////
/*accountsUIBootstrap3.setLanguage('es');
Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'name',
        fieldLabel: 'Nombre',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'surname',
        fieldLabel: 'Apellido',
        inputType: 'text',
        visible: true,
    }, {
        fieldName: 'address',
        fieldLabel: 'Dirección',
        inputType: 'text',
        visible: true,
    },

    {
        fieldName: 'gender',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'Gender',
        inputType: 'radio',
        radioLayout: 'vertical',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
    		id: 1,                  // id suffix of the radio element
            label: 'Male',          // label for the radio element
            value: 'm'              // value of the radio element, this will be saved.
          }, {
            id: 2,
            label: 'Female',
            value: 'f',
            checked: 'checked'
        }],
        visible: true
    }, {
        fieldName: 'country',
        fieldLabel: 'Country',
        inputType: 'select',
        showFieldLabel: true,
        empty: 'Please select your country of residence',
        data: [{
            id: 1,
            label: 'United States',
            value: 'us'
          }, {
            id: 2,
            label: 'Argentina',
            value: 'es',
        }],
        visible: true
    }, {
        fieldName: 'terms',
        inputType: 'checkbox',
        fieldLabel: 'Acepto los terminos y condiciones de uso',

        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('Debes aceptar los terminos y condiciones.');
                return false;
            }
        }
    }]
});


//////////////////////////
//HABILITAR/DESHABILITAR LA CREACION DE CUENTAS
Accounts.config({
  //forbidClientAccountCreation: true
});

//ESTO ES PARA CREAR UN USUARIO ADMINISTRADOR
//TODOS LOS OTROS USUARIOS SON USUARIOS NORMALES Y SOLO PUEDEN CREAR TURNOS COMUNES
/*var users = [
      //{name:"Normal User",email:"normal@example.com",roles:[]},
      //{name:"View-Secrets User",email:"view@example.com",roles:['view-secrets']},
      //{name:"Manage-Users User",email:"manage@example.com",roles:['manage-users']},
      {name:"Admin User",email:"prueba@prueba.com",roles:['admin']}
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "123456",
      profile: { name: user.name }
    });

    Roles.addUsersToRoles(id, 'admin');



  });
*/

// Genera una lista de tareas para cada nuevo usuario

/*

var idUsuario;


idUsuario = Accounts.onCreateUser((options, user) => {
  // Generate a user ID ourselves // Generamos una identificación de usuario nosotros mismos
  user._id = Random.id(); // Need to add the `random` package // Necesito agregar el paquete `random`
  //idUsuario = user._id;
  // Use the user ID we generated // Usa la identificación de usuario que generamos
  //Lists.createListForUser(user._id);
  // Don't forget to return the new user object at the end! // ¡No olvides devolver el nuevo objeto de usuario al final!

  roles:['internet'];
  //consultorio:['todos'];
  Usuarios.insert({idUser:user._id, email: user.emails[0].address});

  //Roles.addUsersToRoles(user._id, 'internet', Roles.GLOBAL_GROUP);
  return user;

});
*/


//Roles.addUsersToRoles(idUsuario, 'internet');




//Roles.addUsersToRoles(idUsuario, 'internet', 'default-group');



/*var users = [
      {name:"Normal User",email:"normal@example.com",roles:[]},
      {name:"View-Secrets User",email:"view@example.com",roles:['view-secrets']},
      {name:"Manage-Users User",email:"manage@example.com",roles:['manage-users']},
      {name:"Admin User",email:"admin@example.com",roles:['admin']}
    ];

_.each(users, function (user) {
  var id;

  id = Accounts.createUser({
    email: user.email,
    password: "apple1",
    profile: { name: user.name }
  });

  if (user.roles.length > 0) {
    // Need _id of existing user record so this call must come
    // after `Accounts.createUser` or `Accounts.onCreate`
    Roles.addUsersToRoles(id, user.roles, 'default-group');
*/
