import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Lists } from '../api/lists.js';
import List from './List.jsx';

// Lists component - displays lists
class ListsDisplay extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const title = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('lists.insert', title);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  constructor(props) {
    super(props);
  }

  renderLists() {
    return this.props.lists.map((list) => {
      const url = `/lists/${list._id}`;

      return (
        <a href={url} key={list._id}>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src="/images/bruegel.jpg" className="img-responsive" />
              <div className="caption">
                <h3>{list.title}</h3>
              </div>
            </div>
          </div>
        </a>
      );
    });
  }

  render() {
    return (
      <div className="row">
        {this.renderLists()}
      </div>
    );
  }
}

ListsDisplay.propTypes = {
  lists: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('lists');
  return {
    lists: Lists.find({}).fetch()
  };
}, ListsDisplay);

// <form className="form new-item" onSubmit={this.handleSubmit.bind(this)} >
//   <div className="form-group">
//     <input
//       type="text"
//       ref="textInput"
//       className="form-control"
//       placeholder="Type to add a new list"
//       />
//   </div>
// </form>
