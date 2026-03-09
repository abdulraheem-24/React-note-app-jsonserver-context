import { createContext, useContext, useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import Validation from "../Hooks/Validation";
import { AppContext } from "../App";


export const fromNoteContext = createContext();

export default function NoteForm () {

    const {addNote , notes, editNote , setEditNote} = useContext(AppContext)

    const [note, setNote] = useState({
        title : "",
        content : "",
        color : "bg-green-300"
    });

    useEffect(() => {
        if (editNote?.id) {
            setNote(editNote)
        }
    },[editNote])
    


    const [error , setError] = useState({});


    function handleSubmit () {
        
        const validationError = Validation(note, notes);
        if (Object.keys(validationError).length) {
            setError(validationError);
            return;
        }

        if (note.id) {
            addNote({
                ...note,
                updatedAt : Date.now()
            })
        }else {
            addNote({
                ...note,
                id : Date.now().toString(),
                isArchived : false,
                createdAt : Date.now()
            });
        }

        setNote({title : "",content : "",color : "bg-green-300",});
        setError({});
        setEditNote({})
    }


    return (
        
            <div className=" grid justify-center pt-10">
                <div className="grid lg:w-150 md:w-130 sm:w-100 p-5 rounded-[10px] shadow-[0_2px_6px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.08)]">
                    
                        <input
                            type="text" 
                            className="outline-none border p-2 rounded-md w-full text-[18px] font-bold
                                        focus:border-blue-400 transition-all duration-200" 
                            placeholder="Title" 
                            value={note.title}
                            onChange={(e) => setNote({...note, title : e.target.value})}
                        />

                        {error.title && <p className="text-red-700">{error.title}</p>}

                        <textarea
                            rows={3}
                            className="outline-none w-full resize-none wrap-break-word border mt-4 rounded-[7px] p-3
                                        focus:border-blue-400 transition-all duration-200" 
                            placeholder="Take a note..."
                            value={note.content}
                            onChange={(e) => setNote({...note, content : e.target.value})} 
                        />


                        {error.content && <p className="text-red-700">{error.content}</p>}
                        {error.duplicate && <p className="text-red-700">{error.duplicate}</p>}
                    
                        <fromNoteContext.Provider value={{note , setNote}}>
                            <ColorPicker />
                        </fromNoteContext.Provider>
                        
                        <button
                            onClick={handleSubmit}
                            className="bg-green-400 mt-3 font-bold text-white md:w-40 sm:w-30  py-1.5 rounded-sm
                                        hover:bg-green-800 transition-all duration-300 cursor-pointer">
                            {note.id ? "Update Note" : "Add Note"}
                        </button>
                        
                </div>
                
            </div>
        
    )
}


