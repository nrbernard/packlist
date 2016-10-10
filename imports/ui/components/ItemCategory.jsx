import React, { Component, PropTypes } from 'react';
import Item from './Item.jsx';

// ItemCategory component - represents a category of items
const ItemCategory = (props) => {
  let filteredItems = props.items;
  if (props.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }

  const categoryItems = filteredItems.map(item => {
    const showPrivateButton = item.owner === props.currentUser._id;

    return (
      <Item key={item._id} item={item} showPrivateButton={showPrivateButton} />
    );
  });

  return (
    <div className="card">
      <div className="card-header">
        {props.category}
      </div>

      <ul className="list-group list-group-flush">
        {categoryItems}
      </ul>
    </div>
  )
}

export default ItemCategory;
