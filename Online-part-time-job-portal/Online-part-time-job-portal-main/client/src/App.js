import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  StudentHome  from './pages/Student/StudentHome.jsx';
import  StudentAuth  from './pages/Student/StudentAuth.jsx';
import JmHome from './pages/JobManager/JmHome.jsx'
import JmAuth from './pages/JobManager/JmAuth.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/shome" element={<StudentHome />} />
          <Route path="/sauth" element={<StudentAuth />} />
          <Route path="/jmhome" element={<JmHome />} />
          <Route path="/jmauth" element={<JmAuth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
