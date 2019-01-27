import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
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
        console.log("esto es el it", it);
        let curso=Curso.findOne({"_id":it.id_curso});
        console.log(curso)
        var prueba = it.nombre + " " +"Curso:"+" "+curso.año+"°"+curso.division+"°"+"Turno:"+" "+curso.turno+" "+"Ciclo:"+" "+curso.ciclo;
        return prueba;
        //return it.dni;
      });
  }
});
