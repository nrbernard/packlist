import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Trips = new Mongo.Collection('trips');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('trips', function tripsPublication() {
    // return Trips.find({userId: this.userId});
    return Trips.find({});
  });
}

Meteor.methods({
  'trips.insert'(data) {
    check(data.title, String);
    check(data.location, String);
    check(data.activities, Array);
    check(data.date, Date);

    if (!this.userId) throw new Meteor.Error('not-authorized');

    // return new Promise((resolve, reject) => {
    return Trips.insert({
      title: data.title,
      location: data.location,
      date: data.date,
      activities: data.activities,
      owner: this.userId,
      createdAt: new Date()
    }, (err, resp) => {
      if (err) return err;
      return resp;
    });
  }
});
