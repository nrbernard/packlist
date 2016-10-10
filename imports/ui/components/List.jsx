import React, { Component, PropTypes } from 'react';
import NewItem from './NewItem.jsx';
import ItemCategory from './ItemCategory.jsx';
import _ from 'lodash';

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

  renderItemCategories() {
    return this.props.categories.map(category => {
      const items = this.props.items.filter(item => item.category === category);
      return <ItemCategory key={category} category={_.capitalize(category)} items={items} hideCompleted={this.state.hideCompleted} currentUser={this.props.currentUser} />;
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

        <div className="card-columns">
          {this.renderItemCategories()}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
};
