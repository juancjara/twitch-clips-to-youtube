import React, { Component } from 'react';
import { Router } from '@reach/router';

import Video from './routes/Video';
import Clips from './routes/Clips';

class App extends Component {
  render() {
    return (
      <Router>
        <Video path="/" />
        <Clips path="/clips" />
      </Router>
    );
  }
}

export default App;
