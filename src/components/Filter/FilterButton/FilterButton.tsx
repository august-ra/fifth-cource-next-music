import styles from "../Filter.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import cn from "classnames"

import FilterList from "@components/Filter/FilterList/FilterList"


interface Props {
  title:          string
  opened:         boolean
  filterList:     string[]
  filterCounters: Record<string, number>
  openFilter:     (filter: string) => void
}

export default function FilterButton({ title, opened, filterList, filterCounters, openFilter }: Props) {
  return (
    <div className={styles.filterButtonWrapper}>
      <div className={cn(styles.filterButton, shared.btnText)} onClick={() => openFilter(title)}>
        {title}
      </div>

      {
        opened
          && (
            <FilterList title={title} filterOptions={filterList} filterCounters={filterCounters} />
          )
      }
    </div>
  )
}
