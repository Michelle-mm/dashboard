import React from 'react'
import {useStateContext} from "../contexts/ContextProvider";
import {ShowReminder} from '.';
export const TodayReminder = ({title, index, customFunc}) => {
    const {currentColor, isClicked, handleClick} = useStateContext();
    const isEven = index%2===0? true: false;
    return (
        <div className="flex w-full justify-between m-4 p-3 font-semibold border-1 rounded-xl"
                style={{backgroundColor: isEven? currentColor :'white',
                color: isEven? 'white' : currentColor,
                borderColor: isEven? "transparent": currentColor}}>
            <button className="w-full"
                    onClick={customFunc}>
                <strong>{title} </strong>
            </button>
        </div>
    )
}


{/* <div key={reminder.id} 
            className="flex w-1/2 justify-between m-4 p-3 font-semibold border-1 rounded-xl"
            style={{backgroundColor: index%2===0? currentColor :'white',
                color: index%2===0? 'white' : currentColor,
                borderColor: index%2===0? "transparent": currentColor}}>
            <button className="w-full">
            <strong>{reminder.title}: </strong> 
            {(isClicked.showReminder && reminder.id===currentReminderID)? 
                <ShowReminder title={reminder.title} body={reminder.body} time={dayjs()}/>:
                null}
            </button>
        </div> */}