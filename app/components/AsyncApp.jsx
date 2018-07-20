import React ,{ Component }from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'



class AsyncApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { someKey: 'someValue' };
  }

  render() {
    return <p>{this.state.someKey}</p>;
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default AsyncApp;
