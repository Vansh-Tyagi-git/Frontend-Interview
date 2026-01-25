import { Link } from "react-router-dom";

export default function HomePage(){
    return (
        <div className="flex flex-col items-center justify-center min-h-64 p-4 text-center">
            <h1 className="text-4xl font-bold">Welcome to CA MONK Blog!</h1>
            <Link to="/blog" className="mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    Click Here to continue
                </button>
            </Link>
            <Link to="/blogs/new" className="mt-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Create New Blog
                </button>
            </Link>
        </div>
    );}