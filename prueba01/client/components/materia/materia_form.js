import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {Materia} from '../../../lib/collections/materia'

Template.materiaForm.events({
  "submit #crearMateria": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
     var newMateria= new Object();     //creo un objeto para almacenar los valores del formulario
     newMateria.name=target.name.value.toUpperCase();     //se alamcena el contenido del input en una objeto
     newMateria.codigo=target.codigo.value;
     newMateria.curso=target.curso.value;
     var code=target.codigo.value;
     let cuenta=Materia.find({"codigo":newMateria.codigo}).count();
     let loggedInUser=Meteor.user();
     console.log("newMateria",newMateria);
     if (Roles.userIsInRole(loggedInUser, ['admin','vice_director','secretario'])){
     if(cuenta===0){    //si cuenta =0 ingreso la nueva materia
     ////////////////////////////////////
  idMateria=Materia.insert({
    nombre:newMateria.name,     //se alamcena el contenido del input en una variable
    codigo:newMateria.codigo,
    id_curso:newMateria.curso,
})
console.log("id materia",idMateria);

alert("Materia ingresada Exitosamente!!!");
} //fin del if de cuenta
else{
    alert("Error, ya existe esa materia");
    Router.go('materiaForm');
}
}//fin del control de roles
else{
  alert("No esta autorizado a crear materias");
  Router.go('profile');
}//else del error de permisos
},//fin de la funcion del event
});
