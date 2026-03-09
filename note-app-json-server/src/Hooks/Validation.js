
export default function Validation (note, prvNotes) {
    const error = {};
    if (note.title.length > 100) error.title = "Title cannot exceed 100 characters.";
    if (!note.content.trim()) error.content = "Content Cannot be Empty";

    if (prvNotes.find(n => 
        n.title === note.title && 
        n.content=== note.content && 
        n.id !== note.id)) 
    {
        error.duplicate = "Duplicate note detected";
    }

    return error;
}