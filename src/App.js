import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {Sidebar, Navbar, ThemeSetting} from "./components"
import Ecommerce, {Employees, ColorPicker, Calendars, Editor, Orders, Customer} from './pages';
import {useStateContext} from "./contexts/ContextProvider";

const App = () => {
    // const activeMenu = true;
    const {activeMenu, themeSettings, setThemeSettings, currentColor, currentMode} = useStateContext();
    return (
        <div className={currentMode==='Dark'? 'dark' : 'light'}>
            <BrowserRouter>
                <div className='flex relative dark:bg-main-dark-bg'>
                    <div className='fixed right-4 bottom-4' style={{zIndex: '1000'}}>
                        <TooltipComponent content='Settings' position='Top'>
                            <button type='button' className='text-3xl p-3 hover:drop-shadow-xl
                            hover:bg-light-gray text-white' style={{background: currentColor, borderRadius:'50%'}}
                            onClick={()=>setThemeSettings((prevThemeSetting)=>!prevThemeSetting)}>
                                <FiSettings/>
                            </button>
                        </TooltipComponent>
                    </div>
                    {activeMenu ? (
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white z-30">
                            <Sidebar />
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg z-30">
                            <Sidebar />
                        </div>
                    )}
                    <div className={
                        activeMenu
                            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full'
                            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
                        }>
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                            <Navbar className='z-40 '/>
                        </div>
                        <div>
                            {themeSettings && <ThemeSetting />}
                            <Routes>
                                {/* dashboard  */}
                                <Route path="/" element={(<Ecommerce />)} />
                                <Route path="/ecommerce" element={(<Ecommerce />)} />
                                {/*pages */}
                                <Route path="/employees" element={(<Employees />)} />
                                <Route path="/orders" element={(<Orders />)} />
                                <Route path="/customers" element={(<Customer />)} />
                                <Route path="/editor" element={(<Editor />)} />
                                {/*apps*/}
                                <Route path="/calendar" element={(<Calendars />)} />
                                <Route path="/color-picker" element={(<ColorPicker />)} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;
