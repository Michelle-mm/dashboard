import React, {useState}from 'react'
import {useStateContext} from "../contexts/ContextProvider";
import { VscDebugStart } from "react-icons/vsc";
import { IoPause } from "react-icons/io5";
import Tooltip from '@mui/material/Tooltip';

export const ColorPicker = () => {
    const {currentColor, setColor} = useStateContext();
    const [startPause, setStartPause] = useState(false);
   
    return (
        <div className="colorPicker m-10 mt-16">
            <h2 className="font-bold text-3xl mt-5" 
                style={{color: currentColor}}>More Theme Colors!:</h2>
            <p className="text-xl font-semibold text-slate-500 mt-4">Pick your Favorate Color!!</p>
            <label className="mt-6 mr-3 text-xl" htmlFor="color-picker" style={{color: currentColor}}>Color:</label>
            <input id="color-picker" type="color" value={currentColor} 
                    onChange={(e)=>setColor(e)} className="mt-6 w-20 h-12"
            />
            <div className="showColor mt-10 ml-3">
                <Tooltip title="Animate" arrow>
                    <button className="startPauseBtn rounded-md w-10 h-10 text-center text-white
                                        hover:opacity-80"
                            style={{backgroundColor: currentColor}}
                            onClick={()=>setStartPause((prevbtn)=>!prevbtn)}>
                        {startPause? <VscDebugStart className="m-auto"/>: <IoPause className="m-auto"/>}
                    </button>
                </Tooltip>
                <div className={`colorBall ${startPause ? 'start' : 'pause'} mt-3 ml-16 rounded-full w-16 h-16`}
                    style={{backgroundColor: currentColor}}></div>
            </div>
            
        </div>
    )
}
