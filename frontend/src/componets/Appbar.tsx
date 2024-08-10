import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"




export const Appbar = () =>{
    return <div className="border-b flex
    py-4 justify-between px-10">
        <Link to={"/"} className="flex flex-col justify-center cursor-pointer font-bold text-gray-600">
            Medium
        </Link>
    <div className="">
        <Link to={'/publish'}>
    <button type="button" className="text-white bg-green-300 hover:bg-green-400 focus:outline-none focus:ring-4 
    focus:ring-green-200 font-medium rounded-full text-sm px-6 py-2.5 text-center me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-800 
    dark:focus:ring-green-400 "  > New</button>
    </Link>

        <Avatar size={"big"} name="pardha"/>
    </div>
    </div>
}