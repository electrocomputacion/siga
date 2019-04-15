import { mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { ReactiveVar } from 'meteor/reactive-var'
import { Materia } from '../../../lib/collections/materia'
import { Curso } from '../../../lib/collections/curso'
import { RelMatDocente } from '../../../lib/collections/relmatdocente'

Template.misMaterias.helpers({
  materias: function(){
    var todo=[];
    var id_usuario = Meteor.userId();
    id_usuario=String(id_usuario);
    //console.log("id_usuario:",id_usuario);
    var relacion = RelMatDocente.find({
      "id_docente":id_usuario,
    }).fetch();
    //console.log("relaciones:", relacion);
    relacion.forEach(function(e){
      let materia = Materia.findOne({
        "_id":e.id_materia,
      });
      //console.log("materia:",materia);
      let curso = Curso.findOne({
        "_id":materia.id_curso,
      });
      //console.log("Curso:", curso);
      var datos={};
      datos.nombre=materia.nombre+" "+curso.año+"°"+curso.division+"° "+"Turno: "+curso.turno+" "+"Ciclo: "+curso.ciclo;
      datos.id_materia=e.id_materia;
      //datos.curso=curso.año+"°"+curso.division+"° "+"Turno: "+curso.turno+" "+"Ciclo: "+curso.ciclo;
      todo.push(datos);
    })
    //console.log(todo);
    return todo;
  }
});

Template.misMaterias.events({
  "click a": function(event){
    event.preventDefault();
    let id=event.currentTarget.id;
    //console.log("id",id);
    let curso = Materia.findOne({_id:id});
    //console.log(curso.id_curso);
    Session.set("id_materia",id);
    Session.set("id_curso",curso.id_curso);
    Router.go('tablaAlumno');
  }
});
