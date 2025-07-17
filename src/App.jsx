import { useEffect, useState } from "react"
import { AddTask } from "./components"
import { Task } from "./components"
import { EditTask } from "./components"
import * as NotesIDB from "./IDB/IDB.js"
import './App.css'


function App() {
    let tasksNumber = NotesIDB.readIDBData().then(notes => console.log(notes));
        
    const [ clicked, setClicked ] = useState(0);

    const handleAddTask =  () => {
        setClicked(tasksNumber += 1)
    }

    // useEffect(()=>{

    // }, [])

    return (
        <>
            <div className="main-container">
                <AddTask onclick={ handleAddTask } />
                {/* <EditTask /> */}
                {/* <Task /> */}
            </div>
        </>
    )
}

export default App
