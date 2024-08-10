import { Auth } from "../componets/Auth"
import { Quote } from "../componets/Quote"



export const Signin = () =>{
        return <div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="hidden lg:block">
                                    <Quote />
                                </div>
                                <div className="">
                                        <Auth type="signin"/>
                                </div>
            </div>
        </div>
}