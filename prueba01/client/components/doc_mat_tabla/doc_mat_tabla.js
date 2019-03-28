import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {ReactiveVar} from 'meteor/reactive-var'
import {Materia} from '../../../lib/collections/materia'
import { Curso } from '../../../lib/collections/curso'
import{ RelMatDocente } from '../../../lib/collections/relmatdocente'

Template.docMatTabla.helpers({
  doc_mat: function(){
    var datos={};
    var array=[];
    let id_materia = Session.get("id_materia");
    //id_materia=String(id_materia);
    console.log("id_materia",id_materia);
    let relacion = RelMatDocente.find({ //verifico si existe alguien asignado a esa materia
      "id_materia": id_materia,
    }).fetch();
      relacion.forEach(function(e) {
        let materia = Materia.findOne({
          "_id":e.id_materia,
        })
        console.log("MATERIA",materia);
        let usuario = Meteor.users.findOne({
          "_id":e.id_docente,
        })
        console.log("USUARIO",usuario);
        datos.nombre=usuario.profile.name;
        datos.apellido=usuario.profile.surname;
        datos.materia=materia.nombre;
        //datos.id_curso;
        array.push(datos);
        console.log("DATOS",datos);
      }) //fin foreach relacion
      console.log("Arreglo",array);
      return array
  }
});
