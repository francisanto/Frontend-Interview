import { apiFetch } from '../../lib/api'
import type { Blog, CreateBlogInput } from './types'

export async function fetchBlogs(): Promise<Blog[]> {
  return apiFetch<Blog[]>('/blogs')
}

export async function fetchBlog(id: string): Promise<Blog> {
  return apiFetch<Blog>(`/blogs/${id}`)
}

export async function createBlog(input: CreateBlogInput): Promise<Blog> {
  const payload = {
    ...input,
    date: new Date().toISOString(),
  }
  return apiFetch<Blog>('/blogs', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

