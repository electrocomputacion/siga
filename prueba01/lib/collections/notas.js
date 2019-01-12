import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import{ check } from 'meteor/check';
import{ Meteor } from 'meteor/meteor';
SimpleSchema.extendOptions(['autoform']);

export const Notas = new Mongo.Collection('notas');
Notas.attachSchema(new SimpleSchema({
  nota:{
    type:String,
    label:"nota",
    optional:false,
  },
  idTabla:{
    type:String,
    label:"idTabla",
    optional:false,
  },
  trimestre:{           //trimestre al que corresponde la nota
    type:String,
    label:"trimestre",
    optional:false,
  },
  orden:{               //numero de orden 1,2,3,4
    type:String,
    label:"orden",
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
