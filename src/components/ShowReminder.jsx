import React from 'react'
import {useStateContext} from "../contexts/ContextProvider";

export const ShowReminder = ({title, body, time}) => {
    const {currentColor} = useStateContext();
    const enterIndex = body.indexOf("\n");
    return (
        <div className="p-3 min-w-60 min-w-96 min-h-96 backdrop-blur-md bg-gray-300/30 border-2 rounded-xl z-40 
                        absolute top-72 right-28 text-left md:backdrop-blur-sm md:bg-gray-200/30"
            style={{borderColor: currentColor, color: currentColor}}>
            <h3 className="font-semibold text-3xl">{title}</h3>
            <p className="text-slate-500/60 whitespace-nowrap">created at: {time.replaceAll("_", " ")}</p>
            <p className="text-2xl text-gray-500">{body.substring(enterIndex+1)}</p>
        </div>
    )
}
