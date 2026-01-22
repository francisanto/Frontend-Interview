import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { createBlog, fetchBlog, fetchBlogs } from './api'
import type { Blog, CreateBlogInput } from './types'

export const blogsKeys = {
  all: ['blogs'] as const,
  detail: (id: string) => ['blogs', id] as const,
}

export function useBlogs() {
  return useQuery({
    queryKey: blogsKeys.all,
    queryFn: fetchBlogs,
  })
}

export function useBlog(id: string | undefined) {
  return useQuery({
    queryKey: id ? blogsKeys.detail(id) : ['blogs', 'detail', 'empty'],
    queryFn: () => {
      if (!id) {
        throw new Error('No blog id provided')
      }
      return fetchBlog(id)
    },
    enabled: Boolean(id),
  })
}

export function useCreateBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateBlogInput) => createBlog(input),
    onSuccess: (created: Blog) => {
      void queryClient.invalidateQueries({ queryKey: blogsKeys.all })
      queryClient.setQueryData(blogsKeys.detail(created.id), created)
    },
  })
}

