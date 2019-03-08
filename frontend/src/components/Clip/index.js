import React from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default ({
  title,
  views,
  channel,
  duration,
  resolution,
  embedUrl,
  _id,
  author,
  onPick,
  selected
}) => (
  <>
    <ListItemIcon>
      <a href={embedUrl} target="_blank" rel="noopener noreferrer">
        <LinkIcon />
      </a>
    </ListItemIcon>
    <ListItemText
      primary={title}
      secondary={
        <>
          <Typography color="textPrimary" component="span">
            {channel} - {duration} - {views} - {author}
          </Typography>
          <Typography component="span">{resolution.replace('x', ':')}</Typography>
        </>
      }
    />
    <ListItemSecondaryAction>
      <Checkbox onChange={() => onPick(_id)} checked={!!selected} />
    </ListItemSecondaryAction>
  </>
);
