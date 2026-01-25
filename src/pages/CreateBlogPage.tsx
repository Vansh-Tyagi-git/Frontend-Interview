import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function CreateBlogPage() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [categoriesText, setCategoriesText] = useState("FINANCE,TECH"); // comma separated

  const categories = useMemo(() => {
    return categoriesText
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
  }, [categoriesText]);

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: async () => {
      // ✅ Important: refresh blog list queries
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      await queryClient.invalidateQueries({ queryKey: ["blogs", "sorted"] });

      // reset form
      setTitle("");
      setDescription("");
      setCoverImage("");
      setContent("");
      setCategoriesText("");

      alert("Blog created successfully!");
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // json-server can generate numeric id automatically if you omit it,
    // so we send payload without id:
    mutation.mutate({
      title,
      description,
      coverImage,
      content,
      category: categories,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card>
        <CardContent className="p-6 space-y-5">
          <h1 className="text-2xl font-bold">Create a New Blog</h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Future of Fintech" />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary shown in sidebar..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Cover Image URL</label>
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.pexels.com/..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Categories (comma separated)</label>
              <Input
                value={categoriesText}
                onChange={(e) => setCategoriesText(e.target.value)}
                placeholder="FINANCE,TECH"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Badge key={c} variant="secondary">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Content</label>
              <textarea
                className="w-full min-h-[160px] rounded-md border border-gray-300 dark:border-gray-700 bg-transparent p-3 text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content here..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Use blank lines to create paragraphs.
              </p>
            </div>

            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create Blog"}
            </Button>

            {mutation.isError && (
              <div className="text-sm text-red-500">
                {(mutation.error as Error).message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
