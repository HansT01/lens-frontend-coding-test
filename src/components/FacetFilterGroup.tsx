import { useState } from 'react'
import { FacetFilter, FacetFilterGroupProps } from './FacetFilter'

export function FacetFilterGroup({ aggregation, label }: FacetFilterGroupProps) {
  const [show, setShow] = useState(true)
  // TODO: useScholar with aggregation enabled:show
  return (
    <div className="ml-2 border">
      <div className={'font-bold p-2 cursor-pointer'} onClick={() => setShow(!show)}>
        {label}
      </div>
      {show && <FacetFilter aggregation={aggregation} />}
    </div>
  )
}
