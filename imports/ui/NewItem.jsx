import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

// NewItem component - creates a new item
class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.categories[0],
      categories: this.props.categories
    };
    this.handleCategoryChange = (e) => {
      const category = ReactDOM.findDOMNode(this.refs.category).value.trim();
      this.setState({category: category});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories && nextProps.categories.length > 0) {
      this.setState({categories: nextProps.categories});
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.item).value.trim();
    const category = ReactDOM.findDOMNode(this.refs.category).value.trim();
    const data = {
      text,
      category,
      tripId: this.props.tripId
    }

    Meteor.call('items.insert', data);

    ReactDOM.findDOMNode(this.refs.item).value = '';
  }


  render() {
    const options = this.props.categories.map(cat => <option value={cat} key={cat}>{_.capitalize(cat)}</option>);

    return (
      <div className="new-trip">
        <h2>New Item</h2>

        <form className="form-inline new-item" onSubmit={this.handleSubmit.bind(this)} >
          <div className="form-group">
            <label className="sr-only" htmlFor="item-name">New Item</label>
            <input
              type="text"
              className="form-control"
              id="item-name"
              ref="item"
              placeholder="Type to add new items"
              />
          </div>

          <div className="form-group">
            <label className="sr-only" htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              value={this.state.category}
              onChange={this.handleCategoryChange}
              ref="category"
            >
            {options}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

NewItem.defaultProps = {
  categories: ['Kitchen'],
  tripId: null
};

export default withRouter(NewItem);
