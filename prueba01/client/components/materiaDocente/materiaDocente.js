import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {ReactiveVar} from 'meteor/reactive-var'
import {Materia} from '../../../lib/collections/materia'
import { Curso } from '../../../lib/collections/curso'
import{ RelMatDocente } from '../../../lib/collections/relmatdocente'



Template.materiadocente.rendered = function() {
  Meteor.typeahead.inject();
};

Template.materiadocente.helpers({
  data: function() {
    return Materia.find().fetch().map(
      function(it) {
        //console.log("esto es el it", it);
        let curso = Curso.findOne({
          "_id": it.id_curso
        });
        //console.log(curso)
        var prueba = it.nombre + " " + "Curso:" + " " + curso.año + "°" + curso.division + "°" + " " + "Turno:" + " " + curso.turno + " " + "Ciclo:" + " " + curso.ciclo;
        return prueba;
        //return it.dni;
      });
  },
  docente(){											//contiene todas las materias
    return Meteor.users.find().fetch().map(
      function(it) {
      //  console.log("esto es el it", it);
        //console.log(curso)
        var pr = it.profile.dni + " " + it.profile.surname + " " + it.profile.name;;
      //  console.log(pr);
        return pr;
        //return it.dni;
      });
    },
});

Template.materiadocente.events({
      "submit #asignMateriaDocente": function(event, template) { //captura el evento submit del formulario
          event.preventDefault();
          const target = event.target;
          var dato_materia = target.id_materia.value;
          var dato_docente = target.id_docente.value;
          var fecha_inicio = target.fecha_inicio.value;
          var revista = target.revista.value;
          //console.log("Datos",dato_materia);
          //console.log("target",target);
          var prueba=dato_materia;
          var dato_materia = dato_materia.split(" ");
          var dato_docente = dato_docente.split(" ");
          let dni_docente = dato_docente[0];            //sirve para buscar el id del docente
        //  console.log("Datos", dato_materia);
          let num = dato_materia[2].split("°");
          console.log("num", num);
          var curso = {};
          //curso.nombre=dato_materia[0];
          curso.turno = dato_materia[4];
          curso.ciclo = dato_materia[6];
          curso.año = parseInt(num[0], 10);
          curso.division = parseInt(num[1], 10);
          //console.log("Datos para consulta", curso);
          let datos_curso = Curso.findOne({ //solo necesito el id del curso
            "año": curso.año,
            "turno": curso.turno,
            "ciclo": curso.ciclo,
            "division": curso.division,
          });
          let materia = Materia.findOne({ //busco la materia en cuestion y la guardo
            "id_curso": datos_curso._id,
            "nombre": dato_materia[0],
          });
          let docente = Meteor.users.findOne({
            "profile.dni":dni_docente,
          });

        let relacion = RelMatDocente.find({       //verifico que no exista la relacion entre el docente
          "id_materia": materia._id,              // y la materia a asignar
          "id_docente": docente._id,
        }).count();
        let relacion2 = RelMatDocente.find({      //verifico si existe alguien asignado a esa materia
          "id_materia":materia._id,
        });
console.log("Materia", materia._id);
console.log("Docente", docente._id);
console.log("Relacion", relacion);
//console.log("Relacion 2", relacion2);
 if(relacion<=0){
   if(confirm("Asignar a"+" "+docente.profile.surname+" "+docente.profile.name+" a la materia"+" "+prueba)){
   console.log("confirmado");
   let id_relacion = RelMatDocente.insert({
        "id_materia":materia._id,
        "id_docente":docente._id,
        "fecha_inicio":fecha_inicio,
        "revista":revista,
        "estado":"activo",
   });
 }
   $('#asignMateriaDocente')[0].reset();
 }
 else{

   if(confirm("Ya existe un docente asignado a esa materia")){
     console.log("confirmado");
   }
 }
    //loggedInUser = Meteor.user();
    //Esta consulta sirve para que no se creen cursos duplicados
    /*var cursos = Curso.findOne({
      año: newCurso.año,
      ciclo: newCurso.ciclo,
      turno: newCurso.turno,
      division: newCurso.division,
    });*/

  },

})
