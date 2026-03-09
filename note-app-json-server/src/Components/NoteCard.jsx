import { useContext } from "react";
import styles from "./NoteCard.module.css";
import { AppContext } from "../App";


export default function NoteCard ({ note }) {
    const {deleteNote , toggleArchive , handleEdit} = useContext(AppContext);
    return (
        <div className={`${styles.noteCard} self-start p-2 rounded-xl shadow-sm ${note.color}`}>
            <b className="font-semibold text-[20px] mb-4">{note.title}</b>
            <p className="whitespace-pre-wrap wrap-break-word mb-3 mt-3">{note.content}</p>
            <div className="text-[11px]">
                Created : {new Date(note.createdAt).toLocaleString() }
            </div>
            {note.updatedAt && <div className="text-[11px]">Updaded : {new Date(note.updatedAt).toLocaleString() }</div>}
            <div className="grid grid-cols-3 gap-1 mt-5 font-bold ">
                <p 
                    className="text-cyan-700 hover:text-cyan-900 cursor-pointer transition text-center py-1 active:bg-white rounded-sm"
                    onClick={() => toggleArchive(note.id)}>
                        {note.isArchived ? "Unarchive" : "Archive"}
                </p>
                <p
                    className="text-cyan-700 hover:text-cyan-900 cursor-pointer transition text-center py-1 active:bg-white rounded-sm"
                    onClick={() => handleEdit(note)}>
                    Edit 
                </p>
                <p className="text-red-700 hover:text-red-900 cursor-pointer transition text-center py-1 active:bg-white rounded-sm"
                    onClick={() => deleteNote(note.id)}>
                    Delete
                </p>
            </div>
        </div>
    )
}