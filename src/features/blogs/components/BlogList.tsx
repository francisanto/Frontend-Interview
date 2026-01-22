import { Link, useLocation } from 'react-router-dom'
import { useBlogs } from '../queries'
import { CategoryIcon } from '../../../components/CategoryIcon'
import { Badge } from '../../../components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Skeleton } from '../../../components/ui/skeleton'
import { formatRelativeTime } from '../../../lib/utils'
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
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 flex-wrap">
              {blog.category.slice(0, 2).map((c) => (
                <Badge
                  key={c}
                  className="flex items-center gap-1 bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  <span className="text-slate-500">
                    <CategoryIcon category={c} />
                  </span>
                  {c}
                </Badge>
              ))}
            </div>
            <span className="text-slate-400">{formatRelativeTime(blog.date)}</span>
          </div>
          <CardTitle className="text-sm font-semibold line-clamp-1 text-slate-900">
            {blog.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs text-slate-600">
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

