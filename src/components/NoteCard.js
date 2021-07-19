import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography, Avatar } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { blue, green, red, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles({
  test: {
    border: (note) => {
      if (note.category === 'work') {
        return '1px solid red';
      }
    },
  },
  avatar: {
    backgroundColor: (note) => {
      if (note.category === 'work') {
        return yellow[500];
      }
      if (note.category === 'money') {
        return green[500];
      }
      if (note.category === 'todos') {
        return red[500];
      }
      return blue[500];
    },
  },
});

export default function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>}
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutline />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="text-secondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
