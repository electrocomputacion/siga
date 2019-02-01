import { Router } from 'meteor/iron:router';


Template.baseLayout.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});
