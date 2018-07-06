import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
Accounts.config({
// enable client user creation
forbidClientAccountCreation: false,
})
})
