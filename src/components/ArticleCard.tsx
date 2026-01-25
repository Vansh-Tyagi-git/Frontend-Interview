import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Post = {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
};



function formatDate(dateIso: string) {
  const d = new Date(dateIso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function estimateReadTimeMins(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)); // ~200 wpm
}

function toParagraphs(text: string) {
  return text
    .split(/\n\s*\n/) // split by blank lines
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function Article({ post }: { post: Post }) {
  const categoryLabel = post.category?.[0] ?? "BLOG";
  const readTime = estimateReadTimeMins(post.content);
  const dateLabel = formatDate(post.date);
  const paragraphs = toParagraphs(post.content);

  const onShare = async () => {
    const url = window.location.href;
    try {
      // @ts-ignore
      if (navigator.share) {
        // @ts-ignore
        await navigator.share({ title: post.title, text: post.description, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      } else {
        alert(url);
      }
    } catch {
      // user cancelled or blocked
    }
  };

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Cover image */}
      <img
        src={post.coverImage}
        alt={post.title}
        className="h-72 w-full object-cover"
        loading="lazy"
      />

      <CardContent className="p-6  bg-white dark:bg-gray-800">
        {/* Top meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="font-semibold tracking-wider text-indigo-600 dark:text-indigo-400">
            {categoryLabel}
          </span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        {/* Title */}
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>

        {/* Share button */}
        <div className="mt-4">
          <Button
            onClick={onShare}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Share Article
          </Button>
        </div>

        {/* Stats row like screenshot */}
        <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <MetaCell label="Category" value={post.category?.join(" & ") || "—"} />
            <MetaCell label="Read Time" value={`${readTime} mins`} />
            <MetaCell label="Date" value={dateLabel} />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Description (subtitle) */}
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          {post.description}
        </p>

        {/* Content */}
        <div className="mt-6 space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-gray-700 dark:text-gray-200 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Footer categories */}
        <div className="mt-8 flex flex-wrap gap-2  bg-white dark:bg-gray-800">
          {post.category?.map((c) => (
            <Badge key={c} variant="secondary">
              {c}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 text-center">
      <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
        {label.toUpperCase()}
      </div>
      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}
