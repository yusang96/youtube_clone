import { BrowserRouter} from 'react-router-dom';
import './App.css';
import Page from './pages/Page';
import Header from './shared/Header';
function App() {

  return (
      <BrowserRouter>
        <Header/>
        <Page/>
      </BrowserRouter>
  
  );
}

export default App;
