import { Router } from 'meteor/iron:router';
import fontawesome from '@fortawesome/fontawesome';
import regular from '@fortawesome/fontawesome-free-regular'
import solid from '@fortawesome/fontawesome-free-solid'
//import brands from '@fortawesome/fontawesome-free-brands'
import { Moment } from 'meteor/momentjs:moment'

//import * as moment from 'moment';

Template.baseLayout.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },
    'click #menu-toggle': function(event){
      event.preventDefault();
      //console.log("Antes de jquery");
      $("#wrapper").toggleClass("toggled");
      //console.log("despues de jquery");
    }
});

Template.baseLayout.helpers({
  currentTime: function() {
  let i =  moment.locale('es');
    console.log("lenguaje",i)
    var tiempo=new Chronos.date();
    console.log(tiempo)
    let hora = tiempo.getHours();
    let minuto = tiempo.getMinutes();
    let segundo = tiempo.getSeconds();
    if(minuto<10){
      minuto='0'+minuto;
    }
    if(segundo<10){
      segundo='0'+segundo;
    }
    if(hora<10){
      hora='0'+hora;
    }
    var hora_lista = hora+':'+minuto+':'+segundo;
    console.log(hora_lista);
    return hora_lista;
    //Template.registerHelper("", function(argument){
  }
});
