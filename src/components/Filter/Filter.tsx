"use client"

import styles from "./Filter.module.css"

import FilterButton from "./FilterButton/FilterButton"

import { useState } from "react"
import { FilterKind, TrackType } from "@/types"


const filterKind: string[] = [
  FilterKind.artist,
  FilterKind.genre,
  FilterKind.year,
]

interface Props {
  trackList: TrackType[]
}

export default function Filter({ trackList }: Props) {
  const [openedFilter, setOpenedFilter] = useState<string | null>(null)

  function getUniqueLists(filter: string): string[] {
    switch (filter) {
      case FilterKind.artist:
        return Array.from(new Set<string>(trackList.map((track) => track.author)))
      case FilterKind.genre:
        return Array.from(new Set<string>(trackList.map((track) => track.genre).flat()))
      case FilterKind.year:
        return ["Сначала новые", "Сначала старые", "По умолчанию"]
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

          return (
            <FilterButton key={index} title={filter} opened={openedFilter === filter} openFilter={handleOpenedFilter} filterList={list} />
          )
        })
      }
    </div>
  )
}
