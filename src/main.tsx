import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { BlogLayout } from './features/blogs/components/BlogLayout'
import { BlogDetail } from './features/blogs/components/BlogDetail'
import { BlogCreateForm } from './features/blogs/components/BlogCreateForm'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogLayout />}>
            <Route index element={<BlogDetail />} />
            <Route path="blogs/:id" element={<BlogDetail />} />
            <Route path="new" element={<BlogCreateForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
