import React from 'react'
import {useStateContext} from '../contexts/ContextProvider';
import {Button} from '.';
import { TiDelete } from "react-icons/ti";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import { cartData } from '../data/dummy';
export const Cart = () => {
    const {currentColor, isClicked, setIsClicked} = useStateContext();
    return (
        <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 "
            style={{opcaity:1}}>
            <div className="float-right h-screen  duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold"
                        style={{color: currentColor}}>
                            Shopping Cart
                    </p>
                    <Tooltip title="Close" arrow>
                        <button className="flex justify-center items-center text-2xl font-bold p-2 hover:bg-gray-100 hover:drop-shadow-xl hover:rounded-full"
                                style={{color: "rgb(153, 171, 180)"}}
                                onClick={()=>setIsClicked(false)}>
                                <TiDelete/>
                        </button>
                    </Tooltip>
                </div>
            
                {cartData?.map((item, index) => (
                    <div key={index}>
                        <div>
                        <div className="flex items-center   leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                            <img className="rounded-lg h-80 w-24" src={item.image} alt="" />
                            <div>
                            <p className="font-semibold ">{item.name}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{item.category}</p>
                            <div className="flex gap-4 mt-2 items-center">
                                <p className="font-semibold text-lg">{item.price}</p>
                                <div className="flex items-center border-1 border-r-0 border-color rounded">
                                <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 "><AiOutlineMinus /></p>
                                <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">0</p>
                                <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"><AiOutlinePlus /></p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
                <div className="mt-3 mb-3">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
                        <p className="font-semibold">$890</p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-gray-500 dark:text-gray-200">Total</p>
                        <p className="font-semibold">$890</p>
                    </div>
                </div>
                <div className="mt-5">
                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Place Order"
                        borderRadius="10px"
                        width="full"
                    />
                </div>
            </div>
        </div>
    )
}
