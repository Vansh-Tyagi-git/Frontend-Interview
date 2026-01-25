import { NavLink } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BlogCardProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
};

export default function BlogCard({
  id,
  title,
  description,
  category,
  date,
}: BlogCardProps) {
  return (
    <NavLink
      to={`/blog/${id}`}
      className={({ isActive }) =>
        `block rounded-xl transition ${
          isActive
            ? "ring-2 ring-indigo-500"
            : "hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-700"
        }`
      }
    >
      <Card>
        <CardContent className="p-4 space-y-3 bg-white dark:bg-gray-800">
          {/* Category + Date */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{category}</Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold leading-snug">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </CardContent>
      </Card>
    </NavLink>
  );
}
