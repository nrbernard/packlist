import React, { Component, PropTypes } from 'react';
import { Items } from '../api/items.js';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Item component - represents a single todo item
export default class Item extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('items.setChecked', this.props.item._id, !this.props.item.checked);
  }

  deleteThisItem() {
    Meteor.call('items.remove', this.props.item._id);
  }

  togglePrivate() {
    Meteor.call('items.setPrivate', this.props.item._id, ! this.props.item.private);
  }

  render() {
    const itemClassName = classnames({
      checked: this.props.item.checked,
      private: this.props.item.private,
    });

    return (
      <li className={itemClassName}>
        <button className="delete" onClick={this.deleteThisItem.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.item.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.item.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className="text">{this.props.item.text}</span>
      </li>
    );
  }
}

Item.propTypes = {
  // This component gets the item to display through a React prop.
  // We can use propTypes to indicate it is required
  item: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired
};
