import React from 'react';
import { Link } from 'react-router';
import crypto from 'crypto';

export default class Gravatar extends React.Component {
  getGravatarImage() {
    const hash = crypto.createHash('md5');
    hash.update(this.props.email.trim().toLowerCase());
    const finalString = hash.digest('hex');

    return `https://www.gravatar.com/avatar/${finalString}?s=${this.props.avatarSize}&d=${this.props.avatarDefault}`;
  }

  constructor(props) {
    super(props);
  }

  render() {
    const imgSrc = this.getGravatarImage();
    return (
      <img src={imgSrc} className="img-fluid img-circle avatar" />
    )
  }
}

Gravatar.propTypes = {
  email: React.PropTypes.string.isRequired,
  avatarSize: React.PropTypes.string.isRequired,
  avatarDefault: React.PropTypes.string.isRequired
};

Gravatar.defaultProps = {
  email: '',
  avatarSize: '48',
  avatarDefault: 'wavatar'
};
