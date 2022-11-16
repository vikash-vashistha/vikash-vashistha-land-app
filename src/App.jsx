import { Routess } from "./Routes/Routes";
import "./App.css";
import { ThemeContext } from "./Context/TheamContext";
import { useContext } from "react";
function App() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  console.log(theme)
  return (
    <div className="App">
      <Routess />
      <button onClick={() => toggleTheme()} >Change Theam</button>
    </div>
  );
}


export default App;
