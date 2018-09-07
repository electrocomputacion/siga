import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Notes } from './notes';
import{ check } from 'meteor/check';
import{ Meteor } from 'meteor/meteor';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Tutor = new Mongo.Collection('tutor');


Tutor.attachSchema(new SimpleSchema({
 name: {
  type: String,
  label: 'Nombre',
  min:2,
  max: 200
 },
 surname: {
  type: String,
  label: 'Apellido',
  min:2,
  max: 200
 },
 dni: {           //restringir dni con mascara obligatorio desde el formulario
  type: Number,
  label: 'DNI',
  min: 1000000,
  max: 99999999
 },
 address: {
  type: String,
  label: 'Dirección',
  min:4,
  max: 200
 },
 fech_nac: {
  type: Date,
  label: 'Fecha Nacimiento',
  max: 200
 },
num_cel: {
  type: Number,
  label: 'Teléfono',
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
 }
}));

Tutor.allow({

  insert: function(userId, doc){

    return doc.owner===userId;

  }
})
