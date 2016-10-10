import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('items', function itemsPublication() {
    return Items.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]
    });
  });
}

Meteor.methods({
  'items.insert'(data) {
    if (!this.userId) throw new Meteor.Error('not-authorized');

    check(data.text, String);
    check(data.category, String);
    check(data.tripId, String);

    Items.insert({
      text: data.text,
      category: data.category,
      tripId: data.tripId,
      createdAt: new Date(),
      owner: this.userId,
      private: true
    });
  },
  'items.remove'(itemId) {
    if (!this.userId) throw new Meteor.Error('not-authorized');

    check(itemId, String);

    const item = Items.findOne(itemId);
    Items.remove(itemId);
  },
  'items.setChecked'(itemId, setChecked) {
    check(itemId, String);
    check(setChecked, Boolean);

    const item = Items.findOne(itemId);
    // if (item.private && item.owner !== this.userId) {
    //   // If the item is private, make sure only the owner can check it off
    //   throw new Meteor.Error('not-authorized');
    // }

    Items.update(itemId, { $set: { checked: setChecked } });
  },
  'items.setPrivate'(itemId, setToPrivate) {
    check(itemId, String);
    check(setToPrivate, Boolean);

    const item = Items.findOne(itemId);

    // Make sure only the item owner can make a item private
    if (item.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Items.update(itemId, { $set: { private: setToPrivate } });
  }
});
