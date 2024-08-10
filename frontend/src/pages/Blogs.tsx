import { useEffect } from "react";
import { BlogCard } from "../componets/BlogCard"
import { useBlogStore } from "../store/blogstore"
import { Appbar } from "../componets/Appbar";
import { Loading } from "../componets/utils/Loading";

export const Blogs = () => {
    const { blogs, fetchBlogs, loading} = useBlogStore();

    useEffect(() => {
        fetchBlogs()
    }, [fetchBlogs])

    // if(loading) {
    //     return <div className="h-screen flex justify-center items-center">
    //     <Loading />
    //     </div>
    // }


    return <div className="w-full h-screen">
      <Appbar />
      {
        loading && 
          <div className="ml-96">
      <Loading />
      </div>
    }  
      <div className="flex flex-col justify-center mx-60 my-6">

        {
            blogs.map((blog) => (
                
                <BlogCard 
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate={new Date(blog.id).toLocaleDateString()}
                />
            ))
        }
        </div>
    </div>
        
}