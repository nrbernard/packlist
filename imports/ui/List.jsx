import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Items } from '../api/items.js';
import Item from './Item.jsx';
import NewItem from './NewItem.jsx';

// List component - displays items
export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {hideCompleted: false};
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderItems() {
    let filteredItems = this.props.items;
    if (this.state.hideCompleted) {
      filteredItems = filteredItems.filter(item => !item.checked);
    }

    return filteredItems.map((item) => {
      const showPrivateButton = item.owner === this.props.currentUser._id;

      return (
        <Item
          key={item._id}
          item={item}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div className="list">
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            /> Hide Completed Items
          </label>
        </div>

        <NewItem tripId={this.props.tripId} categories={this.props.categories} />

        <hr></hr>

        <h2>Items</h2>

        <ul className="list-group">
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired
};
