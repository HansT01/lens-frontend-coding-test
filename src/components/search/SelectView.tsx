import { useTranslation } from 'react-i18next'
import { SearchView } from '../../models/SearchView'
import { useLensStore } from '../../store'

function Tooltip(props: any) {
  return <>{props.children}</>
}

export function SelectView() {
  const { t } = useTranslation()
  const setView = useLensStore((state) => state.setView)
  return (
    <div className={'flex'}>
      <Tooltip content={t('List')}>
        <a className={'text-blue-500 cursor-pointer'} onClick={() => setView(SearchView.List)}>
          list
        </a>
      </Tooltip>
      <div className="w-2" />
      <Tooltip content={t('List')}>
        <a className={'text-blue-500 cursor-pointer'} onClick={() => setView(SearchView.Analysis)}>
          analysis
        </a>
      </Tooltip>
    </div>
  )
}
