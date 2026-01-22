import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'

export function Profile() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('Mark Ravand')
  const [email, setEmail] = useState('mark.ravand@camonk.com')
  const [role, setRole] = useState('Senior Financial Analyst')

  if (!isOpen) {
    return (
      <Button size="sm" variant="outline" onClick={() => setIsOpen(true)}>
        Profile
      </Button>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false)
      }}
    >
      <Card className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-xl font-semibold text-sky-700">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{name}</p>
              <p className="text-sm text-slate-500">{role}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Role</label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
