import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBlogById } from "@/api/blogs";
import Loadingpage from "@/pages/Loadingpage";
import Article from "./ArticleCard";

export default function ArticlePanel() {
  const { id } = useParams(); 

  const blogQuery = useQuery({
    queryKey: ["blog", id],           
    queryFn: () => getBlogById(id!),  
    enabled: !!id,                   
  });

  if (blogQuery.isPending) return <Loadingpage />;
  if (blogQuery.isError) return <div className="p-6 text-red-500">Error loading article</div>;
  if (!blogQuery.data) return <div className="p-6">No article found</div>;

  return <Article post={blogQuery.data} />;
}
