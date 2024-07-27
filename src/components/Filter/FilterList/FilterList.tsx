
interface Props {
  filterOptions: string[]
}

export default function FilterList({ filterOptions }: Props) {
  return (
    <ul className="centerblock__filter filter">
      {
        filterOptions.map((filter) => (
          <li key={filter} className="filter__title">{filter}</li>
        ))
      }
    </ul>
  )
}
