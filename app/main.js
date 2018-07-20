import 'babel-polyfill';
import ReactDOM from "react-dom"
import Index from './components/index.jsx';
import React from 'react'
import { createStore , applyMiddleware ,compose} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';
import thunk from 'redux-thunk';
import logger , { createLogger } from 'redux-logger';
import AsyncApp from './containers/AsyncApp';
//import Root from './containers/Root'

//const loggerMiddleware = createLogger()

let Store = createStore(reducer , compose(applyMiddleware(thunk , logger),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render(
    <Provider store={Store}>
        <AsyncApp />
    </Provider>
   , document.getElementById("root"))