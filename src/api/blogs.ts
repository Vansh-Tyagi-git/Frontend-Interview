export type Blog = {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
};

const BASE = "http://localhost:3001";

export async function getBlogsSorted(): Promise<Blog[]> {
  const res = await fetch(`${BASE}/blogs?_sort=date&_order=desc`);
  if (!res.ok) throw new Error("Failed to fetch Blogs");
  return res.json();
}

export async function getBlogById(id: string): Promise<Blog> {
  const res = await fetch(`${BASE}/blogs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch Blog");
  return res.json();
}