import React, { useState } from 'react';
import {
  Typography,
  Button,
  Container,
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function Create() {
  const history = useHistory();
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('money');
  const headers = {
    'Content-type': 'application/json',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === '') {
      setTitleError(true);
    }

    if (details === '') {
      setDetailsError(true);
    }

    if (title && details) {
      await axios.post('http://localhost:8000/notes', { title, details, category }, headers);
      history.push('/');
    }
  };

  return (
    <Container>
      <Typography variant="h6" component="h2" gutterBottom color="textSecondary">
        Create a new note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="money" />
            <FormControlLabel value="todos" control={<Radio />} label="todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="reminders" />
            <FormControlLabel value="work" control={<Radio />} label="work" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" color="secondary" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
