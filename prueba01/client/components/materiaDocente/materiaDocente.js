import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {ReactiveVar} from 'meteor/reactive-var'
import {Materia} from '../../../lib/collections/materia'
import { Curso } from '../../../lib/collections/curso'
import{ RelMatDocente } from '../../../lib/collections/relmatdocente'

/*/////////////////////////MateriaDocente/////////////////////////////////////
Asignacion de materia a docentes, se controla la existencia de docentes
asignados a las materias para la toma de desiciones y actualizacion de
datos, no puede existir mas de un docente activo por materia.
//////////////////////////////////////////////////////////////////////////////
*/


/*
Depurado el problema de tomar los datos con typeahead, estaria funcionando
correctamente
*/


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
        var prueba = {}
        prueba.id = it._id;
        prueba.name = it.nombre + ", " + "Curso:" + " " + curso.año + "°" + curso.division + "°" + " " + "Turno:" + " " + curso.turno + " " + "Ciclo:" + " " + curso.ciclo;
        return prueba;

        //return it.dni;
      });

  },
  docente() { //contiene todas las materias
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
    //console.log("A ver q sale: ", dato_materia);
    var dato_docente = target.id_docente.value;
    var fecha_inicio = target.fecha_inicio.value;
    var revista = target.revista.value;
    var estado = target.estado.value;
    //console.log("Datos",dato_materia);
    //console.log("target",target);
    var prueba = dato_materia;
    var dato_materia = dato_materia.split(", ");
    var nombre_materia = dato_materia[0];
    //console.log("nombre materia", nombre_materia)
    dato_materia = dato_materia[1].split(" ");
    var dato_docente = dato_docente.split(" ");
    let dni_docente = dato_docente[0]; //sirve para buscar el id del docente
    //  console.log("Datos materia", dato_materia);
    let num = dato_materia[1].split("°");
    //console.log("num", num);
    var curso = {};
    //curso.nombre=dato_materia[0];
    curso.turno = dato_materia[3];
    curso.ciclo = dato_materia[5];
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
      "nombre": nombre_materia,
    });
    let docente = Meteor.users.findOne({
      "profile.dni": dni_docente,
    });
    Session.set("id_materia",materia._id);
      let cuenta = RelMatDocente.find({ //verifico que no exista la relacion entre el docente
      "id_materia": materia._id, // y la materia a asignar
      "id_docente": docente._id,
      "estado": "activo", //verifico el estado de los docentes asigandos para que no haya mas de uno activo
    }).count();
    var relacion2 = RelMatDocente.find({ //verifico si existe alguien asignado a esa materia
      "id_materia": materia._id,
      "estado": "activo",
    }).count();
    /*console.log("Materia", materia._id);
    console.log("Docente", docente._id);
    console.log("Cuenta", cuenta);
    console.log("Relacion2", relacion2)*/
    //console.log("Relacion 2", relacion2);
    if (cuenta <= 0) {                //controlo que no haya docentes asignados
      let lar=relacion2;
      if (lar>0) {
        ////
        if (confirm("Ya existe un docente activo asignado a esa materia, debe primero actualizar los estados")) {
          Session.set("id_materia", materia._id); //guardo en sesion el id para buscar el los docentes asignados
          Router.go('doc_mat_tabla');//mostrar modal de lista de docentes
        } else {
          alert("No se realizaron cambios");
          $('#asignMateriaDocente')[0].reset();
        }
        /////

      } else {
        if (confirm("Asignar a" + " " + docente.profile.surname + " " + docente.profile.name + " a la materia" + " " + prueba)) {
          //console.log("confirmado");
          let id_relacion = RelMatDocente.insert({
            "id_materia": materia._id,
            "id_docente": docente._id,
            "fecha_inicio": fecha_inicio,
            "revista": revista,
            "estado": estado,
          });
        }
        $('#asignMateriaDocente')[0].reset();
      }
    } //fin del if cuenta
    else {
      if (confirm("El docente ya se encuentra asigando como activo en la materia")) {
        //console.log("confirmado");
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
