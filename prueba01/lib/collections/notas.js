import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import{ check } from 'meteor/check';
import{ Meteor } from 'meteor/meteor';
SimpleSchema.extendOptions(['autoform']);

export const Notas = new Mongo.Collection('notas');
Notas.attachSchema(new SimpleSchema({
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
id_materia: {            //relación uno a muchos con la collección materia, en un array se guardan todos los id de materias
   type: String,
   optional: false,
  },

}));
Notas.allow({
  insert: function(userId, doc){
    return doc.owner===userId;
  }
})
