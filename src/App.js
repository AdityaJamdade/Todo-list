import './App.css';
import { Navbar, Todos } from './components';

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className="d-flex">
        <Todos />
      </div>
    </div>
  );
}

export default App;
