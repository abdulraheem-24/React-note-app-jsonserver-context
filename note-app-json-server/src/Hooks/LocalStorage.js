// import { useEffect, useState } from "react";

// export default function useLocalStorage (key, initialValue) {
//     const [notes, setNotes] = useState(() => {
//         const stored = localStorage.getItem(key);
//         return stored ? JSON.parse(stored) : initialValue;
//     })
    
//     useEffect(() => {
//         localStorage.setItem(key,JSON.stringify(notes));
//     },[key, notes]);

//     return [notes, setNotes];
// }