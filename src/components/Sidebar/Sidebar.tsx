"use client"

import styles from "./Sidebar.module.css"

import Image from "next/image"
import Link from "next/link"
import SidebarPersonal from "@components/Sidebar/SidebarPersonal/SidebarPersonal"

import React from "react"
import { useAppSelector } from "@/store/store"
import { useInitCatalogs } from "@/hooks/useInitCatalogs"
import { catalogsImages, CatalogImageDetails, CatalogsOptions } from "@/types/tracksTypes"


function Sidebar() {
  useInitCatalogs()

  const catalogs = useAppSelector((state) => state.playlist.catalogs)

  return (
    <div className={styles.sidebar}>
      <SidebarPersonal />

      <div className={styles.sidebarList}>
        {
          catalogs.map((catalog) => {
            const details: CatalogImageDetails = catalogsImages[catalog.name as CatalogsOptions]

            return (
              <Link key={catalog._id} href={`/tracks/catalogs/${catalog._id}`}>
                <Image src={details.path} alt={details.alt} width={250} height={150} />
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
