import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Topbar from './components/common/Topbar'

function App() {
  return (
    <BrowserRouter>
      <Topbar />
    </BrowserRouter>
  )
}

export default App;
