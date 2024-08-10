import { SignupInput } from "@saradhipardha/medium-common"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { InputBox } from "./utils/InputBox"


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()
    const [formInputs, setFormInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const res = await axios.post(`${BACKEND_URL}/user/${type === 'signup' ? 'signup' : 'signin'}`, formInputs)
            const jwt = res.data.jwt;
            console.log("Retrieved jwt", jwt)
            const token = localStorage.setItem("token", JSON.stringify(jwt))
            console.log("Retrieved token", token)
            navigate(type === 'signup' ? '/signin' : "/blogs")
        } catch (err) {
            alert("Error while signing in")
        }
    }

    return <div className="flex h-screen justify-center flex-col">
        <div className="flex justify-center ">
            <div className="">
                <div className="px-10">
                    Create an Account
                </div>
            <div className="text-slate-500">
                { type ==="signin" ? "Don't have an Account?": "Already have a Account?"   }
                <Link className="pl-2 underline" to={type === 'signin' ? "/signup" : "/signin"}>
                    {type === 'signin' ? 'Sign up' : "Sign in"}
                </Link>
            </div>
                    <div className="pt-8">
                        {type === "signup" ?  <InputBox label="name" placeholder="enter your name" onChange={(e) =>{
                            setFormInputs({
                                ...formInputs,
                                name:e.target.value
                            })
                        }}/> : null }
                    <InputBox label="email" type="email" placeholder="john2gmail.com" onChange={(e) => {
                        setFormInputs({
                            ...formInputs,
                            email:e.target.value
                        })
                    }}    />     
                        <InputBox label="password" type="password" placeholder="1233" onChange={(e) => {
                        setFormInputs({
                            ...formInputs,
                            password:e.target.value
                        })
                    }}    />     

                    <div className="py-3">
                    <button onClick={sendRequest} type="button" className=" w-full  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring=gray-300 font-medium rounded-md text-sm px-5 
                                py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "  >{
                                    type === "signup" ? "Create an account":"Login"}
                                    </button>
                    </div>

                    </div>
            </div>

        </div>

    </div>
}
