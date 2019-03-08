import React from 'react';
import { navigate } from '@reach/router';
import CircularProgress from '@material-ui/core/CircularProgress';

import API from '../../api';
import getDate from '../../utils/getDate';

class Video extends React.Component {
  state = { loading: true, data: undefined };
  componentDidMount() {
    API.getVideo(getDate())
      .then(data =>
        this.setState({
          loading: false,
          data
        })
      )
      .catch(e => navigate('/clips'));
  }
  render() {
    const { loading } = this.state;
    if (loading) return <CircularProgress />;
    return <div>video</div>;
  }
}

export default Video;
