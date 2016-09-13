import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Items } from '../api/items.js';
import Item from './Item.jsx';

// List component - displays items
class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    const data = {
      text: text,
      listId: this.props.params.listId
    }

    console.log(data);

    Meteor.call('items.insert', data);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
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
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = item.owner === currentUserId;

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
        <h2>Items</h2>

        <form className="form new-item" onSubmit={this.handleSubmit.bind(this)} >
          <div className="form-group">
            <input
              type="text"
              ref="textInput"
              className="form-control"
              placeholder="Type to add new items"
              />
          </div>
        </form>

        <ul className="list-group">
          {this.renderItems()}
        </ul>

        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={this.state.hideCompleted}
            onClick={this.toggleHideCompleted.bind(this)}
          />
        Hide Completed Items
        </label>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired
};

export default ListContainer = createContainer(({ params }) => {
  const { tripId } = params;
  const handle = Meteor.subscribe('items');
  const loading = !handle.ready();
  const items = Items.find({tripId: tripId}, { sort: { createdAt: -1 } }).fetch();
  const itemsExist = !loading && !!items;

  return {
    loading,
    itemsExist,
    items,
    currentUser: Meteor.user()
  };
}, List);
