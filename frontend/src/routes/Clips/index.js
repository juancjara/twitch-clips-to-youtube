import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import CreateVideo from './CreateVideo';
import Clip from '../../components/Clip';
import API from '../../api';
import getDate from '../../utils/getDate';

class Clips extends React.Component {
  state = {
    loading: true,
    clips: [],
    selection: {}
  };
  componentDidMount() {
    API.getClips(getDate())
      .then(r => {
        const clips = r.data.sort((a, b) => a.views > b.views);
        this.setState({
          loading: false,
          clips
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          loading: false
        });
      });
  }
  onPick = id => {
    const { selection } = this.state;
    selection[id] = !selection[id];
    this.setState({
      selection
    });
  };
  render() {
    const { loading, clips, selection } = this.state;
    if (loading) return <CircularProgress />;
    if (!clips.length)
      return <Typography color="primary">List is empty for {getDate()}</Typography>;
    const selectedClips = clips.filter(clip => selection[clip._id]);
    return (
      <List>
        {clips.map(clip => (
          <ListItem key={clip._id}>
            <Clip {...clip} onPick={this.onPick} selected={selection[clip._id]} />
          </ListItem>
        ))}
        <Divider />
        <CreateVideo clips={selectedClips} />
      </List>
    );
  }
}

export default Clips;
