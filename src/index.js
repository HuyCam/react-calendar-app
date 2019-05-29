import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Promise from 'redux-promise';

// local components
import App from './components/app';
import reducers from './reducers';

import './style/main.css';

// React router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddReminder from './components/addReminder';
import NoteEditor from './components/noteEditor';

const createStoreWithMiddleware = applyMiddleware(Promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <h1 class="title">Calendar App</h1>
      <div id="app">
        <Switch>
          <Route path="/reminder/add" component={AddReminder} />
          <Route path='/edit' component={NoteEditor} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
