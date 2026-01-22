import { getCategoryIcon } from '../lib/utils'

export function CategoryIcon({ category }: { category: string }) {
  return <>{getCategoryIcon(category)}</>
}
