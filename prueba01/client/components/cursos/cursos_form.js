import {ReactiveVar} from 'meteor/reactive-var'
import {Curso} from '../../../lib/collections/curso'

Template.cursosForm.onCreated(function(){
  this.cicloSel=new ReactiveVar(null);        //variable reactiva del ciclo
});

Template.cursosForm.events({                  //evento que camptura la selección del ciclo
'change #ciclo': function(event, intance){
  var ciclo=$(event.target).val();
  intance.cicloSel.set(ciclo);
}
});


Template.cursosForm.helpers({                 //helper que devulve el array que muestra los años por ciclo
getArray: function(){
    var myArray = [];
    var opt= Template.instance().cicloSel.get();
    if (opt==="cs"){
      myArray = [{num:1},{num:2},{num:3},{num:4}];
    return myArray;
  }
    if(opt==="cb"){
        myArray = [{num:1},{num:2},{num:3}];
        return myArray;
}
if(opt===""){
    myArray = [{num:"Selecciones el ciclo antes"}];
    return myArray;
}
}
});

Template.cursosForm.events({
  "submit #crearCurso": function(event, template){   //captura el evento submit del formulario
     event.preventDefault();
     const target=event.target;
     var newCurso= new Object();     //creo un objeto para almacenar los valores del formulario
     var año=Number(target.año.value);
     newCurso.año=Number(target.año.value);
     newCurso.ciclo=target.ciclo.value;
     newCurso.turno=target.turno.value;
     newCurso.division=Number(target.division.value);
     loggedInUser=Meteor.user();
     //Esta consulta sirve para que no se creen cursos duplicados
     var cursos = Curso.findOne({año: newCurso.año,ciclo:newCurso.ciclo,turno:newCurso.turno,division:newCurso.division,});
     if(cursos){      //compruebo q no exista el curso
       if(cursos.ciclo=="cb"){var msjciclo="Ciclo Básico"}  //convierto para poder mostrar
       if(cursos.ciclo=="cs"){var msjciclo="Ciclo Superior"}
       alert("El Curso "+cursos.año+"° "+cursos.division+"° "+"Turno "+cursos.turno+" del "+msjciclo+" ya existe");
     }
     else{
          if (Roles.userIsInRole(loggedInUser, ['admin','vice_director'])) {  //compruebo si tiene permisos
            Curso.insert({
              año:newCurso.año,
              ciclo:newCurso.ciclo,
              turno:newCurso.turno,
              division:newCurso.division,
            })
            alert("El Curso a sido creado!");
          }
    else {
      alert("No esta Autorizado a crear Nuevos Cursos");
      router.go('profile');
      //throw new Meteor.Error(403, "No esta Autorizado a crear Nuevos Cursos");
      //alert(error.message); //probar si funciona
    }
  }//fin else que permite insertar
},
})
