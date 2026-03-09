import { createContext, useEffect, useMemo, useState } from 'react';
import './App.css';
import ArchiveCard from './Components/ArchiveCards';
import NoteForm from './Components/NoteForm';
import NoteGrid from './Components/NoteGrid';
import SearchBar from './Components/SearchAndSort';
import axios from 'axios';

export const AppContext = createContext();

function App() {
  
  const [notes, setNotes] = useState([]);
  const [search , setSearch] = useState("");
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  const filteredNotes = useMemo(() => (
    notes.filter(note => (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()))
  )), [search, notes]);


  const API = "http://localhost:3000/notes"
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setNotes(res.data)
    }catch(error) {
      setError("Failed to Fetch data")
    }finally{
      setLoading(false)
    }
  } 
  useEffect(() => {
    fetchData();
  },[]);



  const addNote = async(note) => {
    
    let exist = notes.find(n => n.id === note.id);

    if (exist) {
      await axios.patch(`${API}/${note.id}`, note)
      setNotes(prv => prv.map(n => n.id === note.id ? note : n)) 
    }else {
      let res = await axios.post(API, note)
      setNotes(prv => [...prv, res.data])
    }
    
  };


  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    setNotes(prv => prv.filter(n => n.id !== id))
  };

  const toggleArchive = async(id) => {

    let note = notes.find(n => n.id === id);
    let updated  = {...note, isArchived : !note.isArchived};

    await axios.patch(`${API}/${id}`, updated);

    setNotes(prv => prv.map(n => n.id === id ? updated : n))
  };

  const [editNote , setEditNote] = useState({})

  const handleEdit = note => setEditNote(note);


  return (
    <div > 
      <AppContext.Provider
        value={{notes,
                setNotes,
                search,
                setSearch,
                editNote,
                setEditNote,
                addNote,
                deleteNote,
                toggleArchive,
                handleEdit}} >
          
      
        <NoteForm 
          // addNote={addNote} 
          // notes={notes} 
          // NoteEdit={editNote}
          // setEditNote={setEditNote}
        />
        <SearchBar 
          // search={search} 
          // setSearch={setSearch}
          // notes={notes}
          // setNotes={setNotes} 
        />
        <ArchiveCard 
          notes={search.length ? filteredNotes : notes}
          // deleteNote={deleteNote}
          // toggleArchive={toggleArchive}
          // handleEdit={handleEdit}
        />
        <NoteGrid
          notes={search.length ? filteredNotes : notes}
          // deleteNote={deleteNote}
          // toggleArchive={toggleArchive}
          // handleEdit={handleEdit}
        />
      </AppContext.Provider>
    </div>
  )
}

export default App
