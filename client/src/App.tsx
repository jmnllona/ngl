import "./App.css";
import { ImageSlider } from "./components/ImageSlider";
import { Pokedex } from "./components/pokedex";
function App() {

  return (<div className="flex flex-col max-w">
    <ImageSlider></ImageSlider>
    <Pokedex></Pokedex>

  </div>
  );

}

export default App;
