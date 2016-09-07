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
    console.log(data)
    check(data.text, String);
    check(data.listId, String);

    // Make sure the user is logged in before inserting a item
    // if (! this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Items.insert({
      text: data.text,
      listId: data.listId,
      createdAt: new Date(),
      // owner: this.userId,
      // username: Meteor.users.findOne(this.userId).username,
    });
  },
  'items.remove'(itemId) {
    check(itemId, String);

    const item = Items.findOne(itemId);
    // if (item.private && item.owner !== this.userId) {
    //   // If the item is private, make sure only the owner can delete it
    //   throw new Meteor.Error('not-authorized');
    // }

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
    // if (item.owner !== this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Items.update(itemId, { $set: { private: setToPrivate } });
  }
});
