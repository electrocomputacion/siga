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
    //let idCurso="rff7Kh7oWuuHc4jMu";
    //console.log(curso);
    //console.log("el idcurso");
    console.log(idCurso);
    let alumnoId = RelAlumnCurso.find({
      "curso": idCurso
    }
);
  console.log("alumnoId es:");
    console.log(alumnoId);
    arreglo = [{
      alum: alumnoId.alumno
    },
    {
      alum:alumnoId.alumno
    }
  ];

    return arreglo;
  }
  });
  Template.tablaAlumno.rendered = function(){
    console.log("dentro del rendered");
    var arreglo = [];
    let curso = Curso.findOne({
      "año": 1,
      "division": 1,
      "turno": "mañana",
      "ciclo": "cs"
    });
    let idCurso=curso._id;

    //let idCurso="rff7Kh7oWuuHc4jMu";
    console.log(curso);
    console.log("el idcurso");
    console.log(idCurso);
    let curso_alumno = RelAlumnCurso.findOne({"curso": idCurso});
    let alumnoId=curso_alumno.alumno;
    console.log(curso_alumno);
    console.log("alumnoId es:");
    console.log(alumnoId);
    arreglo = [{
      alum: curso
    }];
  //  return arreglo;
  };
