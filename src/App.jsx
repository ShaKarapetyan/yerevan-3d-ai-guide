import MapScene from "./components/MapScene"
import "./App.css"

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapScene onSelectLandmark={(item) => console.log("Selected:", item.name)} />
    </div>
  )
}

export default App