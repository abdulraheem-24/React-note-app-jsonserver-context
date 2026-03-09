import NoteCard from "./NoteCard";

export default function NoteGrid({ notes }) {
    return (
        <div className=" my-10 mx-10 grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {notes.filter(note => !note.isArchived)
                .map(note => {
                    return (
                        <NoteCard 
                            key={note.id}
                            note={note}
                            // deleteNote={deleteNote}
                            // toggleArchive={toggleArchive}
                            // handleEdit={handleEdit}
                        />
                    )
            })}
        </div>
    );
}