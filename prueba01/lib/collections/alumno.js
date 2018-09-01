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
  max: 200
 },
 surname: {
  type: String,
  label: 'Apellido',
  max: 200
 },
 dni: {           //restringir dni con mascara obligatorio desde el formulario
  type: String,
  label: 'DNI',
  max: 8
 },
 address: {
  type: String,
  label: 'Dirección',
  max: 200
 },
 fech_nac: {
  type: Date,
  label: 'Fecha Nacimiento',
  max: 200
 },
 legajo: {
  type: String,
  label: 'Legajo',
  max: 8
 },
 grupo_sang: {
  type: String,
  label: 'Grupo Sanguineo',
  max: 10
 },
 esc_origen: {
  type: String,
  label: 'Escuela Primaria',
  max: 200
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
