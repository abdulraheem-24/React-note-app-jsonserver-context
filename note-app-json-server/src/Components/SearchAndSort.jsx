import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const sortOptions = [
    "Sort by date",
    "Sort by title",
    "Sort by color"
];

export default function  SearchBar() {

    const {search , setSearch , setNotes} = useContext(AppContext)

    const [sortVal , setSortVal] = useState('Sort by date');


    useEffect(() => {
        switch (sortVal) {

            case "Sort by date":
                setNotes(prv =>
                    [...prv].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                );
                break;

            case "Sort by title":
                setNotes(prv =>
                    [...prv].sort((a,b) => a.title.localeCompare(b.title))
                );
                break;

            case "Sort by color":
                setNotes(prv =>
                    [...prv].sort((a,b) => a.color.localeCompare(b.color))
                );
                break;

            default:
                break;
        }
    }, [ sortVal]);
    
    return (
        <nav className="mt-5 w-full flex items-center flex-wrap  gap-4 px-6 py-3 ">

            <div 
                className="px-2 py-1 border rounded-md md:mr-14"> 

                <select name="" id="" 
                    className="outline-none"
                    onChange={e => setSortVal(e.target.value)}>
                    {sortOptions.map((val, i) => (
                        <option className="bg-cyan-50" key={i} value={val}>{val}</option>
                    ))}
                </select>

            </div>
            
            <div className="flex justify-center items-center bg-white rounded-xl shadow-md px-4 py-2 w-full max-w-xl ">
                
                <input 
                    className="outline-none w-full"
                    type="search" 
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

            </div>

        </nav>
    )
}
