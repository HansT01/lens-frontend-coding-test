import { useTheme } from '@/components/ThemeProvider'
import { Link, useQueryParams } from 'raviger'
import { ModeToggle } from './DarkModeToggle'

export function Nav() {
  const [{ q }] = useQueryParams()
  const { theme, systemTheme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  const backgroundColor = isDark ? '#171e25' : '#1f2f40' // TODO: system?
  return (
    <nav className={'text-white flex p-1'} style={{ backgroundColor }}>
      <Link className={'p-4 py-2'} href={'/'}>
        Home
      </Link>
      <Link className={'p-4 py-2'} href={`/search?q=${q}`}>
        Search
      </Link>
      <Link className={'p-4 py-2'} href={`/claim`}>
        Claim
      </Link>
      <Link className={'p-4 py-2'} href={'/about'}>
        About
      </Link>
      <div className="flex-1"></div>
      <ModeToggle />
    </nav>
  )
}
