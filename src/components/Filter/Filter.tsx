"use client"

import styles from "./Filter.module.css"
import cn from "classnames"

import FilterButton from "./FilterButton/FilterButton"

import { useState } from "react"
import { FilterKinds, PlaylistType } from "@/types/tracksTypes"


const filterKind: string[] = [
  "1", // "Искать по:"
  FilterKinds.authors,
  FilterKinds.genres,
  "2", // "Упорядочить по:"
  FilterKinds.year,
]

interface Props {
  visiblePlaylist:  PlaylistType
  filteredPlaylist: PlaylistType
}

export default function Filter({ visiblePlaylist, filteredPlaylist }: Props) {
  const [openedFilter, setOpenedFilter] = useState<string | null>(null)

  function getUniqueLists(filter: string): string[] {
    switch (filter) {
      case FilterKinds.authors:
        return Array.from(new Set<string>(visiblePlaylist.map((track) => track.author)))
          .filter((line) => line !== "-")
          .sort()
      case FilterKinds.genres:
        return Array.from(new Set<string>(visiblePlaylist.map((track) => track.genre).flat()))
          .sort()
      case FilterKinds.year:
        return ["По умолчанию", "Сначала новые", "Сначала старые"]
      default:
        return []
    }
  }

  function getListCounters(filter: string, list: string[]): Record<string, number> {
    const counters: Record<string, number> = { "": 0 }

    if (filter === FilterKinds.authors)
      for (const item of list) {
        const value = filteredPlaylist.reduce((acc, track) => track.author === item ? ++acc : acc, 0)

        if (value)
          counters[item] = value
      }
    else if (filter === FilterKinds.genres)
      for (const item of list) {
        const value = filteredPlaylist.reduce((acc, track) => track.genre.includes(item) ? ++acc : acc, 0)

        if (value)
          counters[item] = value
      }

    return counters
  }

  function handleOpenedFilter(filter: string): void {
    if (openedFilter === filter)
      setOpenedFilter(null)
    else
      setOpenedFilter(filter)
  }

  return (
    <div className={styles.filter}>
      {
        filterKind.map((filter, index) => {
          if (filter === "1")
            return (
              <div key={index} className={styles.filterTitle}>Искать по:</div>
            )
          else if (filter === "2")
            return (
              <div key={index} className={cn(styles.filterTitle, styles.second)}>Упорядочить по:</div>
            )

          const list     = getUniqueLists(filter)
          const counters = getListCounters(filter, list)

          list.sort((lhs, rhs) => ((counters[rhs] ? 1 : 0) - (counters[lhs] ? 1 : 0)) * 1000 + lhs.localeCompare(rhs))

          if (openedFilter && !list.length)
            setOpenedFilter(null)

          return (
            <FilterButton key={index} title={filter}
                          filterList={list} filterCounters={counters}
                          opened={openedFilter === filter} openFilter={handleOpenedFilter} />
          )
        })
      }
    </div>
  )
}
