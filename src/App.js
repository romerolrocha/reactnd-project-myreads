import React from 'react';
import './css/App.css';
import BookSearch from './screens/BookSearch';
import BookShelves from './screens/BookShelves';
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookShelves />} />
        <Route
          path="/search"
          render={({ location }) => <BookSearch mainState={location.state} />}
        />
      </div>
    );
  }
}

export default App;
