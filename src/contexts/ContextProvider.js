import React ,{useState, createContext, useContext} from "react";

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false, 
    notification: false,
    addEventWindow: false,
    showReminder: false
}

export const ContextProvider = ({children})=>{
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);

    const setMode = (event)=>{
        console.log(event.target.value);
        setCurrentMode(event.target.value);
        localStorage.setItem('themeMode', event.target.value);

        setThemeSettings(false);
    }
    const setColor = (event)=>{
        // console.log(event.target.value);
        setCurrentColor(event.target.value);
        localStorage.setItem('themeColor', event.target.value);
        setThemeSettings(false);
    }

    const handleClick=(clicked)=>{
        setIsClicked((prevIsClicked)=>({...initialState, [clicked]:!prevIsClicked[clicked]}));
        // get everything inside the initialState, set only the clicked one to true
    }
    const [screenSize, setScreenSize] = useState(undefined);
    // don't know the window size at first
    
    return(
        <StateContext.Provider value={
            {activeMenu,
            setActiveMenu,
            isClicked, setIsClicked, 
            handleClick,
            screenSize, setScreenSize,
            currentColor, currentMode,
            setMode, setColor,
            themeSettings, setThemeSettings}
        }>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = ()=> useContext(StateContext);
// tell the code to give the data from the context that is useing the context. and specify the context we're using is the "StateContext"

//create context prodiver -> render its children and pass the value data -> wrap the code with it. (index.js)