import { useContext } from "react";
import { fromNoteContext } from "./NoteForm";

const colors = [
    "bg-yellow-200",
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-purple-200"
]


export default function ColorPicker () {

    const {note, setNote} = useContext(fromNoteContext)

    return (
        <div className="flex gap-2 mt-3">
            {colors.map(color => (
                <div 
                    key={color}
                    onClick={() => setNote({...note, color})}
                    className={`w-6 h-6 rounded-full cursor-pointer hover:border-2 hover:border-cyan-800 ${color}`}/>
            ))}
        </div>
    );
}