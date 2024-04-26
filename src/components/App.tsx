import { ThemeProvider } from '@/components/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../globals.css'
import { Nav } from './Nav'
import { Search } from './search/Search'

const defaultQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

export function App({ queryClient = defaultQueryClient() }: { queryClient?: QueryClient }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div className="bg-background">
          <Nav />
          <Search />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
