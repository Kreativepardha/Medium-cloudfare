import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBlogStore } from "../store/blogstore"
import { Appbar } from "../componets/Appbar"



export const Publish = ()=> {
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const navigate = useNavigate()

    const { createBlog } = useBlogStore((state) => ({
        createBlog: state.createBlog
    }))
    const handlePublish = async () => {
            try {
                const newBlog = await createBlog(title, content);
                navigate(`/blog/${newBlog.id}`)
            } catch (err) {
            console.error("Error creating Blog", err)                
            }
    };
        return <div>
            <Appbar />
            <div className="">
                    <input type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
                        placeholder="Title"
                    />
                    <Texteditor onChange={(e) => setContent(e.target.value)}/>
                <button className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-300 rounded-lg focus:ring-4 focus:ring-blue-200"
                    type="submit"
                    onClick={handlePublish}
                >
                    Publish Post
                </button>

            </div>
    </div>
}

function Texteditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <form>
            <div className="w-full mb-4 mt-4">
                <div className="flex items-center justify-between border rounded-md">
                    <div className="py-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea 
                            id="editor" 
                            rows={8}  
                            onChange={onChange} 
                            className="block w-full px-0 text-sm text-gray-800 bg-white" 
                            placeholder="Write an Article" 
                            required 
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}