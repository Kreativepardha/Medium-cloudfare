import { Link } from "react-router-dom";



interface BlogCardProps{
    authorName : string;
    title: string;
    content: string;
    publishedDate:string;
    id:number
}




export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate

} : BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 cursor-pointer pb-4 w-screen 
    bg-white
    my-2
    max-w-screen-lg
       shadow-md shadow-slate-200
       hover:shadow:lg hover:bg-slate-100 rounded-lg ">
        <div className="flex">
                    <Avatar size={"small"} name={authorName}/>
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                        {authorName} 
                        </div>  
                        <div className="flex justify-center flex-col pl-2">
                            <Circle />
                        </div>
                            <div className="pl-2 flex justify-center flex-col font-thin text-sm text-slate-500">
                                 {publishedDate}
                                      </div>
        </div>
        <div className="text-xl pt-2 font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-500 pt-4 text-sm font-thin">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
       
    </div>
    </Link>

}

export function Avatar( { name,size ="small"}: { name:string,size:"small" | "big"}){

    return <div className={`relative inline-flex items-center justify-center 
    ${size==="small"? "w-6 h-6":"w-10 h-10"} 
    bg-blue-200 rounded-full dark:bg-gray-600`}>
        <span className={`text-xs ${size==="small"?"text-xs":"text-md"} text-gray-600 dark:text-gray-200`}>
            {name[0]}
        </span>
    </div>
}
function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-400"></div>
}