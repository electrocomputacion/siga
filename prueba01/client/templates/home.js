import { Router } from 'meteor/iron:router';

Template.home.events({
    'submit #login': function(event){
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
        Router.go('profile');
    }
});
