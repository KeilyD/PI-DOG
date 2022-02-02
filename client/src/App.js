
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/index.jsx";
import Home from "./components/Home/index";
import Dog_Form from "./components/Dog_From/index";
import Dog_Detail from "./components/Dog_Detail/index.jsx";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/newDog" component={Dog_Form} />
        <Route path="/dogDetail/:id" component={Dog_Detail} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;












// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Henry Dogs</h1>
//     </div>
//   );
// }

// export default App;
