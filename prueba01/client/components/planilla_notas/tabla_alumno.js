import {mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor'
import {ReactiveVar} from 'meteor/reactive-var'
import {Session} from 'meteor/session'
import {Alumno} from '../../../lib/collections/alumno'
import {Curso} from '../../../lib/collections/curso'
import {RelAlumnCurso} from '../../../lib/collections/relalumncurso'
import {Notas} from '../../../lib/collections/notas'
///////////////////////////////7

//////////////////////////////7
Template.tablaAlumno.onCreated(function() {
  this.viejoId = new ReactiveVar(null);
  this.nuevoId = new ReactiveVar(null); //variable reactiva del ciclo
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
    var idCurso = curso._id;
    console.log(idCurso);
    ////CONSULTA///////////////////////////////////////////////////
    var coleccion_alumno = [];
    var curso_alumno = RelAlumnCurso.find({
      curso: idCurso,
    }).fetch();
    console.log("curso_alumno",curso_alumno);
    curso_alumno.forEach(function(d) {
      var alumno = Alumno.findOne({
        "_id": d.alumno
      });
      var newAlumno = new Object();
      newAlumno.dni = alumno.dni;
      newAlumno.name = alumno.name;
      newAlumno.surname = alumno.surname;
      var notaslocas = notas(alumno);
      console.log("notas devueltas", notaslocas);
      newAlumno.trim1 = notaslocas.trim1;
      newAlumno.trim2 = notaslocas.trim2;
      newAlumno.trim3 = notaslocas.trim3;
      newAlumno.promFin = notaslocas.promFin;
      console.log("Alumno",newAlumno);
      coleccion_alumno.push(newAlumno);
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
    console.log("alumnos", coleccion_alumno);
    return coleccion_alumno;
  }
});
//////////////////////////////////////////////////////////
//Evento que camputa el id del input donde se hace foco y guarda en la bd la nota asignada
Template.tablaAlumno.events({
  'focus .form-control-plaintext': function(event) {
    event.preventDefault();
    var id1 = event.currentTarget.id;
    var viejoId = Template.instance().nuevoId.get();
    Template.instance().viejoId.set(viejoId);
    var nuevoId = id1;
    Template.instance().nuevoId.set(id1);
    if (viejoId === null) {
      Template.instance().viejoId.set(id1);
    }
    else {
      var datos = viejoId.split('s'); //en datos se desglosan los datos de la celda 0:trimestre, 1:orden, 2:dni
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
          trimestre:datos[0],
          orden:datos[1],
        })
        Alumno.update({_id:idAlumno}, {$push:{
          id_notas:idNota,
        }});

      } //fin del if nota
    }
    console.log("Nuevoid", nuevoId);
    console.log("Viejoid", viejoId);
    console.log("El id de la nota es:", idNota);
  },
});
/*//////////////////////////Funcion datos/////////////////////////////////
Esta funcion recibe como parametro los datos de alumnos, filtra y ordena
las notas correspondientes a cada alumno por n° de nota y por Trimestre,
ademas calcula el promedio x trimestre.
Devuelve los arrays de objetos trim1, trim2 y trim3
///////////////////////////////////////////////////////////////////////*/

function notas(datos) {
  var idNotas = [];
  idNotas = datos.id_notas;
  let dni = datos.dni;
  console.log("Se llamo a la funcion para el DNI", dni);
  console.log("idnotas",idNotas);
  let trim1 = [];
  let trim2 = [];
  let trim3 = [];
  let control=0;
  console.log("solo probando");
  if(idNotas==undefined){
    console.log("dentro if undefined")
    control=0;
  }
  else{
    control=idNotas.length;
    console.log("dentro del else", control)
  }
  console.log("control",control);
  if (control!=0) {
    console.log("al if");
    let todasNotas = [];
    idNotas.forEach(function(e) { //funcion que itera sobre todas las notas disponibles
      var id_notas = Notas.findOne({ //consulto las notas existentes del alumno y de la materia correspondiente
        "_id": e,
        "id_materia": "biologia",
      });
      var obj = {};
      obj.nota = id_notas.nota;
      obj.trimestre = id_notas.trimestre;
      obj.orden = id_notas.orden;
      let idTabla = obj.trimestre + 's' + obj.orden + 's' + dni;
      obj.idTabla = idTabla;
      todasNotas.push(obj); //guardo todas las notas disponibles del alumno en un arreglo
    })
    todasNotas.forEach(function(not) {
      if (not.trimestre === 1) {
        trim1.push(not);
      }
      if (not.trimestre === 2) {
        trim2.push(not);
      }
      if (not.trimestre === 3) {
        trim3.push(not);
      }
    })
    /////////////////////////////////////////
    var p1 = 0;
    var p2 = 0;
    var p3 = 0;
    let i = 0;
    let t1 = trim1.length;
    let t2 = trim2.length;
    let t3 = trim3.length;
    ////////calculo promedio T1////////////////////
    if (t1 != 0) {
      for (i=0; i < t1;) {
        console.log("i", i);
        let act = trim1[i].nota;
        p1 = p1 + act;
        i++;
      }
      p1 = p1 / t1;
      p1 =Math.round(p1/0.5)*0.5;
      console.log("prom1", p1);
    }
    else {
      p1 = null;
      console.log("prom1", p1);
    }
    //////////////////////////////////////////////
    ////////calculo promedio T2////////////////////
    if (t2 != 0) {
      for (i=0; i < t2;) {
        console.log("i", i);
        let act = trim2[i].nota;
        p2 = p2 + act;
        i++;
      }
      p2 = p2 / t2;
      p2 =Math.round(p2/0.5)*0.5;
      console.log("prom1", p2);
    }
    else {
      p2 = null;
      console.log("prom1", p2);
    }
    //////////////////////////////////////////////
    ////////calculo promedio T3////////////////////
    if (t3 != 0) {
      for (i=0; i < t3;) {
        console.log("i", i);
        let act = trim3[i].nota;
        p3 = p3 + act;
        i++;
      }
      p3 = p3 / t3;
      p3 =Math.round(p3/0.5)*0.5;
      console.log("prom1", p3);
    }
    else {
      p3 = null;
      console.log("prom1", p3);
    }
    //////////////////////////////////////////////
    var prom1 = {
      prom1: p1,
    }
    var prom2 = {
      prom2: p2,
    }
    var prom3 = {
      prom3: p3,
    }
  } //if que ve si hay notas en la coleccion alumno
  if ((trim1.length < 4) || (trim2.length < 4) || (trim3.length < 4)) {
    console.log("al if de relleno");
    let k = 0;
    let t1 = trim1.length;
    let t2 = trim2.length;
    let t3 = trim3.length;
    for (t1; t1 < 4;) { //bucle que rellena las notas faltantes
      t1++;
      let obj = {
        nota: false,
        idTabla: 1 + "s" + t1 + "s" + dni,
      }
      trim1.push(obj);
    }
    for (t2; t2 < 4;) {
      t2++;
      let obj = {
        nota: false,
        idTabla: 2 + "s" + t2 + "s" + dni,
      }
      trim2.push(obj);
    }
    for (t3; t3 < 4;) {
      t3++;
      let obj = {
        nota: false,
        idTabla: 3 + "s" + t3 + "s" + dni,
      }
      trim3.push(obj);
    }
  } //fin del if que verifica que todas las notas sean <4
  trim1.push(prom1);
  trim2.push(prom2);
  trim3.push(prom3);
  if((p1>0)&&(p2>0)&&(p3>0)){
    var promFin=p1+p2+p3;
    promFin=promFin/3;
    promFin=toFixedTrunc(promFin, 2);
  }
  else{
    var promFin=null;
  }
  let soloNotas = {
    trim1: trim1,
    trim2: trim2,
    trim3: trim3,
    promFin:promFin,
  };
  console.log("Solo notas", soloNotas);
  return soloNotas;

}
//////////////////////////fin fe funcion datos//////////////////////////////////
function toFixedTrunc(value, n) {
  const v = value.toString().split('.');
  if (n <= 0) return v[0];
  let f = v[1] || '';
  if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
  while (f.length < n) f += '0';
  return `${v[0]}.${f}`
}
