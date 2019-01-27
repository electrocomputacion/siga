import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
//import { Materia } from './materia';
import{ check } from 'meteor/check';
import{ Meteor } from 'meteor/meteor';


export const RelMatDocente = new Mongo.Collection('relmatdocente');
RelMatDocente.attachSchema(new SimpleSchema({
  id_docente:{
    type: String,
    label: 'id_docente',
    optional:false,
  },
  id_materia:{
    type: String,
    label: 'id_materia',
    optional:false,
  },
  fecha_inicio:{    //inicio en el cargo
    type: Date,
    label:'fecha',
    optional:false,
  },
  fecha_fin:{       //fin de actividades en el cargo
    type: Date,
    label:'fecha',
    optional:true,
  },
  owner:{
   type: String,
   label: "Propietario",
   autoValue() {
    return this.userId
   },
   autoform: {
    type: "hidden"
   }
  },
  estado:{              //situacion de revista en el cargo
    type: String,
    label: 'estado',
    optional: false,
  }
}));
RelMatDocente.allow({
  insert: function(userId, doc){
    return doc.owner===userId;
  }
})
