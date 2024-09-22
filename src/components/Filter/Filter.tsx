"use client"

import styles from "./Filter.module.css"

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
      <div className={styles.filterTitle}>Искать по:</div>
      {
        filterKind.map((filter, index) => {
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
