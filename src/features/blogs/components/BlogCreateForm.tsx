import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateBlog } from '../queries'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'

export function BlogCreateForm() {
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorRole, setAuthorRole] = useState('')
  const [authorAvatar, setAuthorAvatar] = useState('')

  const navigate = useNavigate()
  const { mutateAsync, isPending, error } = useCreateBlog()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const categoryList = categories
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)

    const author = authorName
      ? {
          name: authorName,
          role: authorRole || undefined,
          avatar: authorAvatar || undefined,
        }
      : undefined

    const created = await mutateAsync({
      title,
      category: categoryList,
      description,
      coverImage,
      content,
      author,
    })

    setTitle('')
    setCategories('')
    setDescription('')
    setCoverImage('')
    setContent('')
    setAuthorName('')
    setAuthorRole('')
    setAuthorAvatar('')

    navigate(`/blogs/${created.id}`)
  }

  return (
    <Card className="shadow-md">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            New Article
          </h2>
          <p className="text-sm text-slate-500">
            Draft a new blog post for the CA Monk community.
          </p>
        </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="The Future of Fintech in 2026"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Categories
          </label>
          <Input
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            placeholder="FINANCE, TECH"
          />
          <p className="text-[11px] text-slate-400">
            Separate multiple categories with commas.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Short Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="A quick summary that appears in the list view."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Cover Image URL
          </label>
          <Input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://images.pexels.com/..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Content
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Write your full blog content here in plain text..."
            required
          />
        </div>

        <div className="space-y-4 border-t border-slate-200 pt-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-slate-900">Author Information</h3>
            <p className="text-[11px] text-slate-400">
              Optional: Add author details to display with the blog post.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">
              Author Name
            </label>
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Arjun Mehta"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">
              Author Role (Optional)
            </label>
            <Input
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder="Senior Financial Analyst"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">
              Author Avatar URL (Optional)
            </label>
            <Input
              value={authorAvatar}
              onChange={(e) => setAuthorAvatar(e.target.value)}
              placeholder="https://images.pexels.com/..."
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-600">
            Could not create blog. {(error as Error).message}
          </p>
        )}

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
          <Button
            type="submit"
            disabled={isPending}
            className="min-w-[140px] transition-all hover:scale-105 hover:shadow-lg"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Publishing...
              </span>
            ) : (
              'Publish Article'
            )}
          </Button>
        </div>
      </form>
      </CardContent>
    </Card>
  )
}

