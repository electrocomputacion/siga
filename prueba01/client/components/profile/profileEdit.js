import {mongo} from 'meteor/mongo';
import  {Meteor} from 'meteor/meteor'

Template.profileEdit.events({
  "submit #formModificar": function(event, template){
     event.preventDefault();
     const target=event.target;
     var ingresoNombre=target.nombreApellido.value;
     Meteor.user.update({_id:Meteor.userId()}, {$set:{
       "profile.name":ingresoNombre

     }});

  },
});
