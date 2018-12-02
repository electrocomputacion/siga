import { meteor } from 'meteor/meteor';

Template.projects.events({
  'click .remove': function(event, template){
    //console.log("ingreso linea 5");
    //console.log(this._id);
    Meteor.call('projects.remove', this._id);
  }
})
