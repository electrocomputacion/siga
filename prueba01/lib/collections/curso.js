import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import{ check } from 'meteor/check';
import{ Meteor } from 'meteor/meteor';
SimpleSchema.extendOptions(['autoform']);

export const Curso = new Mongo.Collection('curso');
Curso.attachSchema(new SimpleSchema({
año: {
  type: Number,
  label: 'Curso',
  min: 1,
  max: 4,
  optional: false,
},
division:{
  type: Number,
  label: 'División',
  min:1,
  max: 6,
  optional: false,
},
turno:{
  type: String,
  label: 'Turno',
  optional: false,
},
ciclo:{
  type: String,
  label: 'Ciclo',
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
}));
Curso.allow({
  insert: function(userId, doc){
    return doc.owner===userId;
  }
})
