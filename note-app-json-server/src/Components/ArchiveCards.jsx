import { useState } from "react";
import NoteCard from "./NoteCard";

export default function ArchiveCard ({ notes }) {
    const Archived  = notes.filter(note => note.isArchived);
    let [hidden , setHidden] = useState(true);
    return (
        <div className="mx-10 my-5">
            <button onClick={() => setHidden(prv => !prv)}
                className="border rounded-md py-2 px-5 bg-gray-600 text-white font-bold mb-5
                            hover:bg-gray-800 transition-all duration-300 cursor-pointer">
                {hidden ? "Show Archive" : "Hide Archive"}
            </button>
            <div className={`${hidden ? 'hidden': ''} border-2 border-gray-700 rounded-xl p-5 bg-cyan-100`}>
                <p className="text-2xl text-cyan-900 font-bold text-center mb-5 ">
                    Archived Notes
                </p>
                <div className=" grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Archived.map(arch => (
                    <NoteCard 
                        key={arch.id}
                        note={arch}
                        // deleteNote={deleteNote}
                        // toggleArchive={toggleArchive}
                        // handleEdit={handleEdit}
                    />
                ))}
            </div>
            </div>
        </div>
    )
}