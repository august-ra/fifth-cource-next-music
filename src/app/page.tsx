import Bar from "@components/Bar/Bar"
import Main from "@components/Main/Main"


export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <Main />
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  )
}
