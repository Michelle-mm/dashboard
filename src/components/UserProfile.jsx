import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar0.png';
import { TiDelete } from "react-icons/ti";
import Tooltip from '@mui/material/Tooltip';

export const UserProfile = () => {
    const { currentColor, setIsClicked } = useStateContext();
    return (
        <div className="nav-item absolute right-1 top-16 border-2 bg-white/30 backdrop-blur-md dark:bg-[#42464D] p-8 rounded-lg w-96"
            style={{borderColor: currentColor}}>
            <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl dark:text-gray-200"
                    style={{color: currentColor}}>
                        User Profile
                </p>
                <Tooltip title="Close" arrow>
                    <button className="flex justify-center items-center text-2xl font-bold p-2 hover:bg-gray-100 hover:drop-shadow-xl hover:rounded-full"
                            style={{color: "rgb(153, 171, 180)"}}
                            onClick={()=>setIsClicked(false)}>
                            <TiDelete/>
                    </button>
                </Tooltip>
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
                <img
                className="rounded-full h-24 w-24"
                src={avatar}
                alt="user-profile"
                />
                <div>
                <p className="font-semibold text-xl dark:text-gray-200"> Michael Roberts </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">  Administrator   </p>
                <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> info@shop.com </p>
                </div>
            </div>
            <div>
                {userProfileData.map((item, index) => (
                <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                    <button
                    type="button"
                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                    className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                    >
                    {item.icon}
                    </button>

                    <div>
                    <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
                    <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
                    </div>
                </div>
                ))}
            </div>
            <div className="mt-5">
                <Button
                color="white"
                bgColor={currentColor}
                text="Logout"
                borderRadius="10px"
                width="full"
                />
            </div>
    </div>

    )
}
