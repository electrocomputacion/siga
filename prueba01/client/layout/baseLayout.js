import { Router } from 'meteor/iron:router';
import fontawesome from '@fortawesome/fontawesome';
import regular from '@fortawesome/fontawesome-free-regular'
import solid from '@fortawesome/fontawesome-free-solid'
import brands from '@fortawesome/fontawesome-free-brands'


Template.baseLayout.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },
    'click #menu-toggle': function(event){
      event.preventDefault();
      console.log("Antes de jquery");
      $("#wrapper").toggleClass("toggled");
      console.log("despues de jquery");
    }
});
