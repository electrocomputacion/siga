import {mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor'
import {ReactiveVar} from 'meteor/reactive-var'
import {Session} from 'meteor/session'
import {Alumno} from '../../../lib/collections/alumno'
import {Curso} from '../../../lib/collections/curso'
import{ RelAlumnCurso } from '../../../lib/collections/relalumncurso'

Template.tablaAlumno.onCreated(function(){
  this.viejoId=new ReactiveVar(null);
  this.nuevoId=new ReactiveVar(null);        //variable reactiva del ciclo
});

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
    console.log(idCurso);
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

Template.tablaAlumno.events({
'focus.form-control-plaintext':function(event){
  var id1=event.currentTarget.id;
  Template.instance().nuevoId.set(id1);
  var viejoId=Template.instance().viejoId.get();
  var nuevoId=Template.instance().nuevoId.get();
  if(viejoId===null){
    Template.instance().viejoId.set(nuevoId);
  }
  else{
    let selector='#'+viejoId;
    console.log(selector);
    $(selector).blur(function(event){
      var valor=$(selector).val();
      console.log("El valor es:",valor);

      Temaplate.instance().viejoId.set(nuevoId);
    })
  }
/*  var id=id1.toString();
  if(id!=0){
  var completo=id.split(",");
  var trimestre=completo[0];
  var nota=completo[1];
  var dni=completo[2];
  console.log("trimestre:",trimestre);
  console.log("nota:",nota);
  console.log("dni:",dni);*/
  console.log("el viejo id es:", viejoId);
  console.log("El nuevo id es:",nuevoId);

}
});
