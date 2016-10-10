import React, { Component, PropTypes } from 'react';
import { Items } from '../api/items.js';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import _ from 'lodash';

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
    const listItemClassName = classnames('list-group-item', {
      checked: this.props.item.checked,
      private: this.props.item.private
    });

    const buttonClassName = classnames('btn btn-sm toggle-private pull-xs-right', {
      'btn-warning': this.props.item.private,
      'btn-success': !this.props.item.private
    });

    return (
      <li className={listItemClassName}>
        <form className="form-inline">
          <button type="button" className="close delete pull-xs-right" aria-label="Close"><span aria-hidden="true" onClick={this.deleteThisItem.bind(this)}>&times;</span></button>

          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                checked={this.props.item.checked}
                onChange={this.toggleChecked.bind(this)}
                /> {this.props.item.text}
              </label>
          </div>

          <span className="tag tag-pill tag-default">{_.capitalize(this.props.item.category)}</span>

          { this.props.showPrivateButton ? (
            <button className={buttonClassName} onClick={this.togglePrivate.bind(this)}>
              { this.props.item.private ? 'Private' : 'Public' }
            </button>
          ) : ''}
        </form>
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
