import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Lists = new Mongo.Collection('lists');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('lists', function listsPublication() {
    return Lists.find({});
  });
}

Meteor.methods({
  'lists.insert'(title) {
    check(title, String);

    Lists.insert({
      title,
      createdAt: new Date()
    });
  }
});
