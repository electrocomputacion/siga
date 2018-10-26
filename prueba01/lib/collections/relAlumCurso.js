import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Curso } from './curso';
import { Alumno } from './alumno';
import{ check } from 'meteor/check';
import{ Meteor } from 'meteor/meteor';


export const RelAlumnCurso = new Mongo.Collection('relalumncurso');
RelAlumnCurso.attachSchema(new SimpleSchema({
  alumno:{
    type: String,
    label: 'id_alumno',
    optional:false,
  },
  curso:{
    type: String,
    label: 'id_curso',
    optional:false,
  },
  fecha:{
    type: Date,
    label:'fecha',
    optional:false,
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
}));
RelAlumnCurso.allow({
  insert: function(userId, doc){
    return doc.owner===userId;
  }
})
