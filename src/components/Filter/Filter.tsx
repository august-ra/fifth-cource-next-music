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
  playlist: PlaylistType
}

export default function Filter({ playlist }: Props) {
  const [openedFilter, setOpenedFilter] = useState<string | null>(null)

  function getUniqueLists(filter: string): string[] {
    switch (filter) {
      case FilterKinds.authors:
        return Array.from(new Set<string>(playlist.map((track) => track.author)))
          .filter((line) => line !== "-")
          .sort()
      case FilterKinds.genres:
        return Array.from(new Set<string>(playlist.map((track) => track.genre).flat()))
          .sort()
      case FilterKinds.year:
        return ["По умолчанию", "Сначала новые", "Сначала старые"]
      default:
        return []
    }
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

          const list = getUniqueLists(filter)

          if (openedFilter && !list.length)
            setOpenedFilter(null)

          return (
            <FilterButton key={index} title={filter} opened={openedFilter === filter} openFilter={handleOpenedFilter} filterList={list} />
          )
        })
      }
    </div>
  )
}
