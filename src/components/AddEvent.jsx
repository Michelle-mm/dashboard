import React from 'react'
import {useStateContext} from "../contexts/ContextProvider";
export const AddEvent = ({updateReminder, setTextArea}) => {
    const {currentColor, handleClick} = useStateContext();
    return (
        <div className="w-40 h-20 border-2 z-30">
            <textarea
                onChange={(e) => setTextArea(e.target.value)}
                className="border-2 rounded-xl p-3"
                style={{borderColor: currentColor}}
                placeholder="Write your reminder here..."
                rows={20}
                cols={30}/>
            <div className="flex">
                <button className="m-4 p-2 font-semibold rounded-xl" 
                        style={{backgroundColor: currentColor, color: 'white'}}
                        onClick={updateReminder}>
                            Save
                </button>
                <button className="m-4 p-2 font-semibold bg-red-300 rounded-xl" 
                        style={{color: 'white'}}
                        onClick={()=>handleClick("addEventWindow")}>
                            Cancel
                </button>
            </div>
        </div>
    )
}
