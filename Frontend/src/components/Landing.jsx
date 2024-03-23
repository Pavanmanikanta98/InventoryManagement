import { useNavigate } from "react-router-dom"

export const Landing = () => {
    const navigate = useNavigate()    

    const handle=()=>{

    //  console.log(".nkjnkl")
    navigate("/login")

    }

    return <>

        <div className="bg-gray-200 h-screen flex flex-col">
            <div className="text-gray-700 text-center bg-gray-400 px-4  h-1/5">navbar</div>
            <div className="bg-gray-200 w-screen h-4/5 flex">
                <div className=" flex w-1/5 bg-green-400 text-center justify-center items-center  ">left</div>
                <div id="login" className="w-3/5  bg-white-400 flex justify-center flex-grow">

                    <div id="loin" className="flex">
                        <button id="loginButton" onClick={handle}>Login</button>
                    </div>
                </div>
                <div className="w-1/5 bg-green-400 ">right</div>
            </div>
        </div>
    </>
}