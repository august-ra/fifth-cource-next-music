"use client"

import styles from "../Filter.module.css"
import cn from "classnames"

import { useAppDispatch, useAppSelector } from "@/store/store"
import { FilterKeys, setFilter } from "@/store/features/playerSlice"
import { FilterKinds } from "@/types/tracksTypes"


interface Props {
  title:          string
  filterOptions:  string[]
  filterCounters: Record<string, number>
}

export default function FilterList({ title, filterOptions, filterCounters }: Props) {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => ({
    ...state.player.filters,
    kind: (title === FilterKinds.authors ? "authors" : title === FilterKinds.genres ? "genres" : "sort") as FilterKeys,
  }))

  function toggleFilter(value: string) {
    if (filters.kind === "sort" && filters.sort === value)
      return

    dispatch(setFilter({ kind: filters.kind, value }))
  }

  return (
    <div className={styles.filterListContainer}>
      <ul className={cn(styles.filterList, { [styles.filterListLong]: filterOptions.length > 5 })}>
        {
          filterOptions.map((filter) => {
            const counter: number | boolean = filterCounters[filter] || false
            const isActive = filters.kind === "sort" ? filters.sort === filter : filters[filters.kind].includes(filter)

            return (
              <li key={filter} className={styles.filterLine} onClick={() => toggleFilter(filter)}>
                <span className={cn(styles.filterCaption, { [styles.active]: isActive })}>{filter}</span>&nbsp;
                {
                  counter
                    && (
                      <span className={styles.filterCounter}>({counter})</span>
                    )
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
