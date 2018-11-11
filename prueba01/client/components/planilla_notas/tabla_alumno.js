import {mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {Alumno} from '../../../lib/collections/alumno'
import {Curso} from '../../../lib/collections/curso'
import{ RelAlumnCurso } from '../../../lib/collections/relalumncurso'

Template.tablaAlumno.helpers({
  alumnos() {
   var arreglo = [];
    let curso = Curso.findOne({
      "año": 1,
      "division": 1,
      "turno": "mañana",
      "ciclo": "cs"
    });
    let idCurso=curso._id;
////CONSULTA///////////////////////////////////////////////////
var coleccion_alumno=[];
var curso_alumno = RelAlumnCurso.find({"curso": idCurso});
curso_alumno.forEach(function(d){
  var alumno=Alumno.findOne({"_id":d.alumno});
  coleccion_alumno.push(alumno);
})
coleccion_alumno.sort(function (a, b) {     //funcion que ordena los datos por apellido
  if (a.surname > b.surname) {
    return 1;
  }
  if (a.surname < b.surname) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
console.log("colecion alumnos",coleccion_alumno);
///////////////////////////////////////////////////////////////
    return coleccion_alumno;
  }
  });
//////////////////////////////////////////////////////////
