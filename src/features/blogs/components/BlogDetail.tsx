import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBlog } from '../queries'
import { CategoryIcon } from '../../../components/CategoryIcon'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Skeleton } from '../../../components/ui/skeleton'
import { calculateReadTime } from '../../../lib/utils'

export function BlogDetail() {
  const params = useParams()
  const blogId = params.id
  const { data, isLoading, isError, error } = useBlog(blogId)
  const [shareCopied, setShareCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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

  const readTime = calculateReadTime(data.content)
  const primaryCategory = data.category[0] || 'GENERAL'

  return (
    <Card className="overflow-hidden border-none shadow-lg transition-shadow hover:shadow-xl">
      <div className="relative h-64 w-full overflow-hidden bg-slate-100 sm:h-80 lg:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.coverImage}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <CardContent className="space-y-6 pt-6">
        {/* Top metadata row */}
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">
              <CategoryIcon category={primaryCategory} />
            </span>
            <Badge className="bg-slate-100 text-slate-700">{primaryCategory}</Badge>
          </div>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">{readTime} min read</span>
        </div>

        {/* Title and Share Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {data.title}
            </h1>
          </div>
          <Button
            onClick={handleShare}
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all"
            size="sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            {shareCopied ? 'Copied!' : 'Share Article'}
          </Button>
        </div>

        {/* Detailed metadata block */}
        <div className="flex flex-wrap items-center gap-4 rounded-lg bg-slate-50 px-4 py-3 text-xs">
          <div>
            <span className="font-semibold text-slate-700">CATEGORY:</span>{' '}
            <span className="text-slate-600">{data.category.join(' & ')}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span className="font-semibold text-slate-700">READ TIME:</span>{' '}
            <span className="text-slate-600">{readTime} Mins</span>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span className="font-semibold text-slate-700">DATE:</span>{' '}
            <span className="text-slate-600">
              {new Date(data.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <p className="text-base text-slate-600 leading-relaxed">{data.description}</p>

        <article className="prose prose-slate max-w-none text-base leading-relaxed text-slate-700">
          {data.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim()
            if (!trimmed) return null

            // Check if paragraph looks like a quote (starts and ends with quotes)
            const isQuote =
              trimmed.startsWith('"') &&
              trimmed.endsWith('"') &&
              trimmed.length > 50

            // Check if it's a heading (short line, no period, might be all caps or title case)
            const isHeading =
              trimmed.length < 100 &&
              !trimmed.includes('.') &&
              (trimmed === trimmed.toUpperCase() ||
                (trimmed.split(' ').length <= 6 && trimmed[0] === trimmed[0].toUpperCase()))

            if (isQuote) {
              return (
                <div
                  key={idx}
                  className="my-8 rounded-xl border-l-4 border-sky-500 bg-sky-50/60 p-6 text-center italic text-slate-800"
                >
                  <p className="text-lg leading-relaxed">{trimmed}</p>
                </div>
              )
            }

            if (isHeading) {
              return (
                <h2 key={idx} className="mt-8 mb-4 text-xl font-bold text-slate-900">
                  {trimmed}
                </h2>
              )
            }

            return (
              <p key={idx} className="mb-4 text-slate-700 leading-7">
                {trimmed}
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

