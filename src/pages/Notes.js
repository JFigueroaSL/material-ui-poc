import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';

export default function Notes() {
  const backendURL = 'http://localhost:8000/notes/';
  const [notes, setNotes] = useState();

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await axios.get(backendURL);
      setNotes(data);
    }
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(backendURL + id);
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes &&
          notes.map((note) => (
            <div item key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </div>
          ))}
      </Masonry>
    </Container>
  );
}
