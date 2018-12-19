import {mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor'
import {ReactiveVar} from 'meteor/reactive-var'
import {Session} from 'meteor/session'
import {Alumno} from '../../../lib/collections/alumno'
import {Curso} from '../../../lib/collections/curso'
import {RelAlumnCurso} from '../../../lib/collections/relalumncurso'
import {Notas} from '../../../lib/collections/notas'

Template.tablaAlumno.onCreated(function() {
  this.viejoId = new ReactiveVar(null);
  this.nuevoId = new ReactiveVar(null); //variable reactiva del ciclo
  this.alumnos = new ReactiveVar(null);
  /////////////////////////////////////
  var arreglo = [];
  /*var curso = Curso.findOne({
    "año": 1,
    "division": 1,
    "turno": "mañana",
    "ciclo": "cs"
  });
  var idCurso = curso._id;
  console.log(idCurso);
  ////CONSULTA///////////////////////////////////////////////////
  var coleccion_alumno = [];
  var curso_alumno = RelAlumnCurso.find({
    curso: idCurso,
  }).fetch();
  console.log("curso_alumno", curso_alumno);
  curso_alumno.forEach(function(d) {
    var alumno = Alumno.findOne({
      "_id": d.alumno
    });
    coleccion_alumno.push(alumno);
    //console.log("Id's Notas",idNotas);
    //console.log("Id's Notas 2",todasNotas);
  })
  coleccion_alumno.sort(function(a, b) { //funcion que ordena los datos por apellido
    if (a.surname > b.surname) {
      return 1;
    }
    if (a.surname < b.surname) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  console.log("colecion alumnos", coleccion_alumno);
  Template.instance().alumnos.set(coleccion_alumno);
  return;
  /////////////////////////////////////
});

Template.tablaAlumno.helpers({
  alumnos() {
    var coleccion_alumno = Template.instance().alumnos.get();
    return coleccion_alumno;
  }
});
//////////////////////////////////////////////////////////
//Evento que camputa el id del input donde se hace foco y guarda en la bd la nota asignada
Template.tablaAlumno.events({
  'focus.form-control-plaintext': function(event) {
    event.preventDefault();
    var id1 = event.currentTarget.id;
    var viejoId = Template.instance().nuevoId.get();
    Template.instance().viejoId.set(viejoId);
    var nuevoId = id1;
    Template.instance().nuevoId.set(id1);
    if (viejoId === null) {
      Template.instance().viejoId.set(id1);
    } else {
      var datos = viejoId.split('s');
      var dni_alumno = datos[2];
      console.log("dni del alumno", dni_alumno);
      var selector = '#' + viejoId;
      var nota = $(selector).val();
      console.log("el selector es:", selector);
      console.log("La nota es:", nota);
      var materia = "biologia";
      if (nota != 0) { //controlo que el input no este vacio
        alumno = Alumno.findOne({
          "dni": dni_alumno
        });
        let idAlumno = alumno._id;
        var idNota = Notas.insert({
          nota: nota,
          id_materia: materia,
          idTabla: viejoId,
        })
        Meteor.call('id_notas.update', idAlumno, idNota);
        /*Alumno.update({_id:idAlumno}, {$push:{
          "id_nota":idNota,
        }});*/

      } //fin del if nota
    }
    console.log("Nuevoid", nuevoId);
    console.log("Viejoid", viejoId);
    console.log("El id de la nota es:", idNota);
  } //fin del evento focus
});

Template.tablaAlumno.onRendered(function() {
  console.log("al rendered");
  var datos = Template.instance().alumnos.get();
  console.log("Dentro del rendered, datos= ", datos);
  datos.forEach(function(d) {
    var idNotas = [];
    idNotas = datos.id_notas;
    console.log(idNotas);
    //let largo_array=idNotas.length;
    if (idNotas != undefined) {
      console.log("hay notas");
      var todasNotas = [];
      idNotas.forEach(function(e) { //funcion que itera sobre todas las notas disponibles
        console.log("Esto es el e", e);
        var id_notas = Notas.find({ //consulto las notas existentes del alumno y de la materia correspondiente
          "_id": e,
          "id_materia": "biologia",
        }).fetch();
        console.log("Esto es el id de la nota que va a buscar", id_notas);
        id_notas.forEach(function(a) { //arreglo que itera sobre las notas disponibles
          let ida = a.idTabla;
          var id = "#" + ida; //guardo el id de la celda de la tabla
          var nota = a.nota; //guardo la nota
          console.log("el id de celda es", id, "La nota es ", nota);
          if (id != 0) { //controlo que no este vacio el id
            console.log("entro al if");
            $(id).val(nota); //seteo la celda con la nota correspondiente
          }
        })
        //console.log(id_notas);
        todasNotas.push(id_notas); //guardo todas las notas disponibles del alumno en un arreglo
      })
      /////////////////////////////////////////
    } //if que ve si hay notas en la coleccion alumno
  }) //fin del forEach de datos
});
//////////////////////////////////////////////////////////////////////////////////
