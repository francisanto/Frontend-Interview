import { Link, useLocation } from 'react-router-dom'
import { useBlogs } from '../queries'
import { Badge } from '../../../components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Skeleton } from '../../../components/ui/skeleton'
import type { Blog } from '../types'

function BlogListItem({ blog, isActive }: { blog: Blog; isActive: boolean }) {
  return (
    <Link to={`/blogs/${blog.id}`} className="block transition-transform hover:scale-[1.02]">
      <Card
        className={`mb-3 cursor-pointer border-l-4 transition-all ${
          isActive
            ? 'border-sky-500 bg-sky-50/60 shadow-md'
            : 'border-transparent hover:border-sky-200 hover:shadow-sm'
        }`}
      >
        <CardHeader className="gap-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex flex-wrap gap-1">
              {blog.category.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>
          <CardTitle className="text-sm font-semibold line-clamp-1">
            {blog.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs">
            {blog.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export function BlogList() {
  const { data, isLoading, isError, error } = useBlogs()
  const location = useLocation()
  const activeId =
    location.pathname.startsWith('/blogs/')
      ? location.pathname.split('/').at(-1) ?? ''
      : ''

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
        Failed to load blogs. {(error as Error).message}
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No blogs yet. Create your first blog from the right panel.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {data.map((blog) => (
        <BlogListItem
          key={blog.id}
          blog={blog}
          isActive={blog.id === activeId}
        />
      ))}
    </div>
  )
}

