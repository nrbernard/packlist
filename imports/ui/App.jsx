import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Items } from '../api/items.js';
import Item from './Item.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
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

    Meteor.call('items.insert', text);

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
      <div className="container">
        <header>
          <h1>Pack List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
          Hide Completed Items
          </label>

          <form className="new-item" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new items"
            />
          </form>
        </header>

        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('items');

  return {
    items: Items.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Items.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user()
  };
}, App);
