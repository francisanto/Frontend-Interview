import { useParams } from 'react-router-dom'
import { useBlog } from '../queries'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent } from '../../../components/ui/card'
import { Skeleton } from '../../../components/ui/skeleton'

export function BlogDetail() {
  const params = useParams()
  const blogId = params.id
  const { data, isLoading, isError, error } = useBlog(blogId)

  if (!blogId) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
        <p className="text-sm font-medium">Select a blog from the left</p>
        <p className="mt-1 text-xs">
          Or create a new one using the “New Article” button.
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-3xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
        Unable to load this blog. {(error as Error).message}
      </div>
    )
  }

  if (!data) return null

  return (
    <Card className="overflow-hidden border-none shadow-md transition-shadow hover:shadow-lg">
      <div className="relative h-64 w-full overflow-hidden bg-slate-100 sm:h-80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.coverImage}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="space-y-6 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap gap-1">
            {data.category.map((c) => (
              <Badge key={c}>{c}</Badge>
            ))}
          </div>
          <span>{new Date(data.date).toLocaleDateString()}</span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {data.title}
          </h1>
        </div>

        <p className="text-sm text-slate-500">{data.description}</p>

        <article className="prose prose-slate max-w-none text-sm leading-relaxed">
          {data.content.split('\n').map((paragraph, idx) => {
            // Check if paragraph looks like a quote (starts and ends with quotes)
            const isQuote =
              paragraph.trim().startsWith('"') &&
              paragraph.trim().endsWith('"') &&
              paragraph.length > 50

            if (isQuote) {
              return (
                <div
                  key={idx}
                  className="my-6 rounded-xl border-l-4 border-sky-500 bg-sky-50/50 p-6 text-center italic text-slate-700"
                >
                  <p className="text-base leading-relaxed">{paragraph}</p>
                </div>
              )
            }

            return (
              <p key={idx} className="mb-3">
                {paragraph}
              </p>
            )
          })}
        </article>

        {data.author && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            <div className="flex items-center gap-3">
              {data.author.avatar ? (
                <img
                  src={data.author.avatar}
                  alt={data.author.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                  {data.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Written by {data.author.name}
                </p>
                {data.author.role && (
                  <p className="text-xs text-slate-500">{data.author.role}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-400 transition-colors hover:text-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </button>
              <button className="text-slate-400 transition-colors hover:text-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

