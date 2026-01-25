import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import { getBlogsSorted} from "@/api/blogs";

export default function SideBar(){

    const blogsQuery = useQuery({
        queryKey: ["blogs", "sorted"],
        queryFn: getBlogsSorted,
    });
    return (
        <>
           <aside className="flex flex-col scrollbar-hide max-h-screen overflow-y-auto border-r p-6 sm:p-4">
                <h1 className="text-sm font-semibold mb-4">Latest Articles</h1>
                
                {blogsQuery.isLoading && (<p>Loading...</p>)}
                {blogsQuery.isError && (<p>Error: {(blogsQuery.error as Error).message}</p>)}
                {blogsQuery.isSuccess && (
                    <div className="">
                        {blogsQuery.data.map((blog)=>{
                            return (<BlogCard key={blog.id} id={blog.id}title={blog.title} description={blog.description} category={blog.category[0]}   date={blog.date}/>)
                        })}
                    </div>
                )}

            </aside>  
        </>
    );
}