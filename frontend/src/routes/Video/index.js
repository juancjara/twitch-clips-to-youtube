import React from 'react';
import { navigate } from '@reach/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import API from '../../api';
import getDate from '../../utils/getDate';

class Video extends React.Component {
  state = { loading: true, data: undefined };
  componentDidMount() {
    API.getVideo(getDate())
      .then(res =>
        this.setState({
          loading: false,
          data: res.data
        })
      )
      .catch(e => navigate('/clips'));
  }
  render() {
    const { loading, data } = this.state;
    if (loading) return <CircularProgress />;
    const { title, description, resolution, day, status, youtubeVideoUrl, tags } = data;
    return (
      <Card>
        <CardHeader title={title} subheader={description} />
        {youtubeVideoUrl && <CardMedia component="iframe" src={youtubeVideoUrl} />}
        <CardContent>
          <Typography paragraph>Resolution: {resolution}</Typography>
          <Typography paragraph>Day: {day}</Typography>
          <Typography paragraph>Tags: {tags}</Typography>
          <Typography paragraph>Status: {status}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Video;
