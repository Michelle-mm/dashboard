import React, {useState} from 'react'

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Tooltip from '@mui/material/Tooltip';

import { Header, AddEvent, ShowReminder, TodayReminder } from '../components';
import {useStateContext} from "../contexts/ContextProvider";

import { MdDeleteSweep, MdOutlineDeleteForever } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

export const Calendars = () => {
  const [reminders, setReminders] = useState(() => JSON.parse(localStorage.getItem("reminders")) || []); 
  const [textArea, setTextArea] = useState('');
  const [currentReminderID, setCurrentReminderID] = useState(null);
  const [value, setValue] = React.useState(dayjs()); //date
  const {currentColor, isClicked, handleClick} = useStateContext();

  React.useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders))
  }, [reminders])

  const updateReminder = () => {
    const textTitle = textArea.split("\n")[0];
    let dateFormat = formatDate(value.$d, 'op2');
    const convertedDateforID = dateFormat.replaceAll(',', '').replaceAll(' ', '_').split('GMT')[0].trim();
    const newReminder = {
      id: convertedDateforID,
      selectedDate: formatDate(value.$d, 'op1'),
      title: textTitle,
      body: textArea
    }
    setReminders(prevReminder => [...prevReminder, newReminder]);
    setTextArea('');
    setValue(dayjs());
    handleClick("addEventWindow");
  };

  function deleteReminder(event, id) {
    event.stopPropagation();
    setReminders(oldReminders=>{
        const newReminders = oldReminders.filter((oldReminder)=>
          oldReminder.id !== id
        )
        return newReminders
    })
  }

  const cleanupLocalStorage =()=>{
    localStorage.clear()
    setReminders(() => JSON.parse(localStorage.getItem("reminders")) || []);
    return;
  }

  const formatDate = (date, op) => {
    if (!date) return 'None';
    const options1 = { year: 'numeric', month: 'long', day: 'numeric' };
    const options2 = {weekday: 'short', year: 'numeric', month: 'short', 
                      day: 'numeric', hour: 'numeric', minute: 'numeric', 
                      second: 'numeric', hour12: false};
    let convertedDate = op==='op1' ? date.toLocaleDateString('en-US', options1) : date.toLocaleDateString('en-US', options2);
    return convertedDate.split('GMT')[0].trim();
  };

  const handleReminderBtnClick = (id)=>{
    handleClick('showReminder');
    setCurrentReminderID(id)
  }
  const filterTodayReminder = reminders.filter((reminder)=>(reminder.selectedDate===formatDate(value.$d, 'op1')));

  return (
    <div className="flex flex-col m-2 md:m-10 mt-16 p-2 md:p-10">
      <div className="m-5 flex flex-col items-center justify-evenly border-2 rounded-xl md:flex-row" 
            style={{borderColor: currentColor}}>
        <div className="p-2 m-2 flex flex-col items-center">
          <Header category="Page" title="Calendar" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                  <DemoItem>
                      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                  </DemoItem>
              </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="m-5 mt-12 min-h-72 reminder-container self-start">
            {/* {className="border-2 border-gray-300"} */}
            <h2 className="m-2 text-2xl font-bold" style={{color: currentColor}}>
              {formatDate(value.$d, 'op1')}
            </h2>
            <h2 className="m-2 text-xl font-bold" style={{color: currentColor}}>
              Todo: 
            </h2>
            {filterTodayReminder.length > 0 ?(
              filterTodayReminder.map((filterReminder, index)=>{
                return <TodayReminder key={filterReminder.id} title={filterReminder.title} index={index}
                                        customFunc={()=>handleReminderBtnClick(filterReminder.id)}/>
              })): 
              <p className="m-3 text-xl text-slate-400 font-semibold">No arrangements today</p>}            
        </div>
      </div>
      
        <div className="flex flex-col z-10 mx-4 mb-6 min-h-60 p-3 md:w-1/2">
          <div className="flex items-center">
            <h3 className="text-2xl font-semibold mr-3">Reminders:</h3>
            <Tooltip title='Add Reminder'>
              <button className="w-10 h-10 pl-2 text-2xl font-bold rounded-xl hover:drop-shadow-xl" 
                      style={{backgroundColor: currentColor, color: 'white', opacity: 0.7}}
                      onClick={()=>handleClick('addEventWindow')}>
                <IoIosAdd/>
              </button>
            </Tooltip>
            {isClicked.addEventWindow && <AddEvent setTextArea={setTextArea} updateReminder={updateReminder}/>}
            <Tooltip title="CleanUp all Reminders" arrow>
              <button className="h-10 w-10 ml-2 text-white text-2xl pl-2 bg-gray-100 rounded-xl 
                                hover:drop-shadow-xl hover:bg-gray-200" 
                      onClick={cleanupLocalStorage}>
                      {/* CleanUp Reminders */}
                      <MdDeleteSweep style={{color: currentColor}}/>
              </button>
            </Tooltip>
          </div>
          {reminders.map((reminder, index) => (
            <div key={reminder.id} 
                className="flex w-1/2 justify-between items-center m-4 p-3 font-semibold border-1 rounded-xl"
                style={{backgroundColor: index%2===0? currentColor :'white',
                      color: index%2===0? 'white' : currentColor,
                      borderColor: index%2===0? "transparent": currentColor}}>
              <button className="w-full" onClick={()=>handleReminderBtnClick(reminder.id)}>
                <p>{reminder.selectedDate}</p>
                <strong>{reminder.title}: </strong> 
                {(isClicked.showReminder && reminder.id===currentReminderID)? 
                  <ShowReminder title={reminder.title} body={reminder.body} time={reminder.id}/>:
                  null}
              </button>
              <Tooltip title="Delete this Reminder " arrow>
                <button className="h-7 flex justify-center items-center ml-3 p-1 rounded bg-red-300 text-white font-bold"
                        onClick={(event)=>deleteReminder(event,reminder.id)}>
                          <MdOutlineDeleteForever/>
                </button>
              </Tooltip>
            </div>
        ))}
        </div>  
    </div>
  );
};


// export const Calendar = () => {
//     const [value, setValue] = React.useState(dayjs('2022-04-17'));
//     const [currentNote, setCurrentNote] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);
//     const {currentColor} = useStateContext();

//     const Item = styled(Paper)(({ theme }) => ({
//         ...theme.typography.body2,
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//         height: 300,
//         lineHeight: '60px',
//       }));
//     const formatDate = (date) => {
//         if (!(date instanceof Date) || isNaN(date)) return 'None'; 
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         const formatedDate = date.toLocaleDateString(undefined, options);
//         return formatedDate;
//     };
//     // console.log(value.$d);

//     return (
//         <div className="m-5 flex items-center justify-evenly border-2 rounded-xl" style={{borderColor: currentColor}}>
//             <div className="p-3 m-4 flex flex-col items-center">
//                 <Header category="Page" title="Calendar" />
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DemoContainer components={['DateCalendar', 'DateCalendar']}>
//                         <DemoItem>
//                             <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
//                         </DemoItem>
//                     </DemoContainer>
//                 </LocalizationProvider>
//             </div>
//             <Box sx={{display: 'flex', flexWrap: 'wrap',
//                     '& > :not(style)': {
//                         m: 1, width: 400, height: 300,},}}
//             >
//                 <Item elevation={3}>
//                     <h3 className="font-semibold" style={{color: currentColor}}>{formatDate(value.$d)}</h3>
//                 </Item> 
//             </Box>
//         </div>
//     );
// }

