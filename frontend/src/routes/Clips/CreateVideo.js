import React from 'react';
import { navigate } from '@reach/router';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import API from '../../api';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    maxWidth: 700,
    marginTop: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 2
  },
  fieldControl: {
    marginBottom: theme.spacing.unit
  },
  duration: {
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit
  }
});

class CreateVideo extends React.Component {
  state = { title: '', description: '', resolution: '', tags: '', loading: false, error: '' };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = () => {
    const { clips } = this.props;
    const { title, description, resolution, tags } = this.state;
    const payload = {
      title,
      description:
        description +
        `\n${clips
          .map(clip => `${clip.channel} https://www.twitch.tv/${clip.channel}`)
          .join(`\n`)}`,
      resolution,
      tags,
      day: clips[0].day,
      clips: clips.map(clip => ({
        id: clip._id,
        twitchId: clip.twitchId
      }))
    };
    this.setState({
      error: '',
      loading: true
    });
    API.createVideo(payload)
      .then(() => navigate('/'))
      .catch(error =>
        this.setState({
          loading: false,
          error
        })
      );
  };
  render() {
    const { title, description, resolution, tags, loading, error } = this.state;
    const { clips, classes } = this.props;
    const totalDuration = clips.reduce((acc, clip) => acc + clip.duration, 0);
    const disabled = !title || !resolution || !tags || clips.length < 2;
    const resolutions = [...new Set(clips.map(clip => clip.resolution.replace('x', ':')))];

    return (
      <Paper className={classes.root}>
        <form>
          <FormLabel component="legend">Create compilation</FormLabel>
          <Typography color="primary" className={classes.duration}>
            Duration: {totalDuration.toFixed(2)} - {clips.length} clips
          </Typography>
          <FormControl fullWidth className={classes.fieldControl}>
            <TextField label="Title" name="title" onChange={this.onChange} value={title} />
          </FormControl>
          <FormControl fullWidth className={classes.fieldControl}>
            <TextField
              multiline
              label="Description"
              name="description"
              onChange={this.onChange}
              value={description}
            />
          </FormControl>
          <FormControl fullWidth className={classes.fieldControl}>
            <InputLabel htmlFor="resolution">Resolution</InputLabel>
            <Select
              value={resolution}
              onChange={this.onChange}
              inputProps={{
                name: 'resolution',
                id: 'resolution'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {resolutions.map(r => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.fieldControl}>
            <TextField label="Tags" name="tags" onChange={this.onChange} value={tags} />
          </FormControl>
          <FormControl className={classes.fieldControl}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={this.onSubmit}
              >
                Create compilation
              </Button>
            )}
            {error && <Typography color="error">{error}</Typography>}
          </FormControl>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(CreateVideo);
