import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './App/AppRouter';

function App() {
  return (
    <Router basename='https://flow-issue-tracker-production.up.railway.app/'>
      <AppRouter/> 
    </Router>
  );
}

export default App;
