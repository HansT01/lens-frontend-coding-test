import { useFormik } from 'formik'
import { theme } from '../../theme'
import { suggestions } from '../../suggestions'
import { random } from 'lodash'
import { Input } from '@/components/ui/Input'
import { useLensStore } from '@/store'

interface SearchFormProps {
  q: string
  setQuery: ({ q }: { q: string }) => void
}

export function SearchForm({ q, setQuery }: SearchFormProps) {
  const { setShowSearchResults } = useLensStore()
  const formik = useFormik({
    initialValues: {
      q
    },
    onSubmit: (values) => {
      // setQuery({ q: values.q })
      setShowSearchResults(true)
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className="flex justify-between">
      <div className={'flex-1 p-1 gap-4'}>
        <Input
          id="q"
          name="q"
          onChange={formik.handleChange}
          defaultValue={formik.values.q || ''}
          className="p-2 border border-grey-2 w-full"
          placeholder="Search patents and scholarship"
          style={{ textAlign: 'right' }}
        />
        <a
          className="hidden p-2 cursor-pointer text-sm text-blue-400 opacity-0 hover:opacity-100"
          aria-label="Submit Search"
          onClick={() => {
            const q = suggestions[random(suggestions.length - 1)]
            setQuery({ q })
            window.location.reload()
          }}
        >
          suggestion
        </a>
      </div>
      <div className={'p-1'}>
        {/*<button className={`p-1 px-2 text-white ${buttonClass} rounded`}>Search {SearchTypeLabels[searchType]}</button>*/}
        <button className={`p-2 px-4 text-white rounded`} style={{ backgroundColor: theme.primary }}>
          Search
        </button>
      </div>
    </form>
  )
}
