import React from 'react';
import { Provider } from 'react-redux'
import AsyncApp from '../components/AsyncApp';
import configureStore from '../store/configureStore'

const store = configureStore()

export default class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <AsyncApp />
        </Provider>
      )
    }
  }
