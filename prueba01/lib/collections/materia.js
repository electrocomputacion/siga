import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import{ check } from 'meteor/check';
import{ Meteor } from 'meteor/meteor';
//import { Notas } from './Notas';

SimpleSchema.extendOptions(['autoform']);

export const Materia = new Mongo.Collection('materia');
Materia.attachSchema(new SimpleSchema({
nombre: {
  type: String,
  label: 'Materia',
  optional: false,
},
codigo:{
  type: String,
  label: 'Código',
  optional: false,
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
created: {
 type: Date,
 autoValue() {
  return new Date()
 },
 autoform: {
  type: "hidden"
 }
},
id_curso: {            //relación uno a muchos con la collección curso
   type: Array,
   optional: false,
  },
  'id_curso.$': String,
}));
/*Notas.allow({
  insert: function(userId, doc){
    return doc.owner===userId;
  }
})*/
Materia.allow({
  insert: function(userId, doc){
    return doc.owner===userId;
  }
})
