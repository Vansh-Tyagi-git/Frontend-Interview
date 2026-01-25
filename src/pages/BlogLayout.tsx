import SideBar from "@/components/SideBar";
import SubHeader from "@/components/SubHeader";
import ArticlePanel from "@/components/ArticlePanel";

export default function BlogLayout() {
  return (
    <>
      <SubHeader />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr]">
        <SideBar />
        <ArticlePanel />
      </div>
    </>
  );
}
