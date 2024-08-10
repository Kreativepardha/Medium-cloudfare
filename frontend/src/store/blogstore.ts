import { create } from "zustand";
import { BACKEND_URL } from "../config";
import axios from "axios";




export interface Blog {
    id:number;
    title:string;
    content:string;
    author:{
        name:string;
    };
}

interface BlogState {
    blogs: Blog[]
    blog?:Blog;
    loading:boolean;
    fetchBlogs: () => Promise<void>;
    fetchBlogById: (id: string) => void;
    createBlog: (title: string, content: string) => Promise<Blog>
}




export const useBlogStore = create<BlogState>((set) => ({
    blogs:[],
    blog: undefined,
    loading:false,

    fetchBlogs: async () =>{
        set({ loading:true  });
        try {
            const storedToken = localStorage.getItem("token")
            const token = storedToken ? JSON.parse(storedToken) : '' ;
            const res = await axios.get(`${BACKEND_URL}/blog`, {
                headers: {
                    Authorization:token
                },
            });
            set({ blogs: res.data.blogs, loading:false  })
        } catch (err) {
console.error("Error fetching blogs:", err)
set({loading:false})
        }
    },

        fetchBlogById: async (id: string) => {
            set({loading:true});
            try {
                    const storedToken = localStorage.getItem("token")
                    const token = storedToken ? JSON.parse(storedToken) : ""
                    const response = await axios.get(`${BACKEND_URL}/blog/${id}`,{
                        headers: {
                            Authorization: token
                        },
                    });
                    set({  blog: response.data.blog, loading: false  })
            } catch (err) {
                console.error("error while fetching the blog", err)
                set ({ loading:false})
            }
        },
    createBlog: async(title, content) =>{ 
        const storedToken = localStorage.getItem("token")
        const token = storedToken ? JSON.parse(storedToken) : "" ;
        const response = await axios.post(`${BACKEND_URL}/blog`, {
            title,
            content
        }, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    }, 








}));