import { useParams } from "react-router-dom"
import { useBlogStore } from "../store/blogstore";
import { useEffect } from "react";
import { BlogCard } from "../componets/BlogCard";
import { Loading } from "../componets/utils/Loading";







export const Blog = () => {
    const {id} = useParams();
    const {blog, fetchBlogById, loading} = useBlogStore((state) =>({
        blog: state.blog,
        fetchBlogById: state.fetchBlogById,
        loading:state.loading,
    }))

        useEffect(() => {
            if(id){
                fetchBlogById(id);
            }
        },[fetchBlogById, id])

        if(loading) {
            return <div className="flex h-screen  justify-center items-center p-12 ">
                 <div className="flex items-center justify-between p-4 shadow-lg w-1/2">
            <div>
                <div className="flex justify-center items-center gap-12">
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-8 mb-2.5 p-12"></div>
                          <div className="h-2  bg-gray-300 rounded-full dark:bg-gray-700 w-28"></div>
                             </div>
                                       <div className="w-56 h-2 m-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                                               <div className="w-42 h-2 m-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                                               <div className="w-12 h-2 m-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                                            </div>
                                        </div>
            </div>
        }

        if(!blog){
            return <div>Blog not found</div>
        }


return <div className="flex justify-center items-center h-screen bg-gray-200 bg-opacity-20 ">
    <BlogCard
    key={id}
      id={blog.id}
      authorName={blog.author?.name || "Unknown Author"}
      title={blog.title}
      content={blog.content}
      publishedDate={new Date(blog.id).toLocaleDateString()}
    />
    </div>
        
}