import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()

    const login=()=>{
        //login process



        //end if
        navigate('/dashboard')

    }

    return <div className="flex items-center justify-center h-screen w-full bg-gray-100">
        <div className="bg-white px-8 py-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-gray-500 text-center font-bold text-xl mb-4">Inventory Management System</h1>
            <form className="space-y-4">
                <div className="flex flex-col"> <label className="text-gray-700 mb-2">Email:</label> <input id="email" type="email" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-2">Password:</label>
                    <input id="password" type="password" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md w-full" onClick={login}>  LOGIN</button>
            </form>
        </div>
    </div>

}