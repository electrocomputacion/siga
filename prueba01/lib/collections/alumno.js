import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Notes } from './notes';
import{ check } from 'meteor/check';
import{ Meteor } from 'meteor/meteor';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Alumno = new Mongo.Collection('alumno');


Alumno.attachSchema(new SimpleSchema({
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
 legajo: {
  type: Number,
  label: 'Legajo',
  optional: true,

 },
 grupo_sang: {
  type: String,
  label: 'Grupo Sanguineo',
  optional: true,
  max: 10
 },
 esc_origen: {
  type: String,
  label: 'Escuela Primaria',
  max: 200
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

Alumno.allow({

  insert: function(userId, doc){

    return doc.owner===userId;

  }
})

Meteor.methods({
  'alumno.remove'(alumnoId){
    check(alumnoId, String );
    Alumno.remove(alumnoId);
  }
})