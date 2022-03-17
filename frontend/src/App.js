import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";

import LOGO from "./components/logo"
import Main from "./components/main.component"
import Student from "./components/student.component"
import Teacher from "./components/teachers.component"

function App() {
  return (
    <Router>
      
    <div className="container" >
    <LOGO />
    <Routes>
   
    
    <Route  exact path="/" element={<Main />}> </Route>
    <Route  exact path="/student" element={<Student />}> </Route>
    <Route  exact path="/teacher" element={<Teacher />}> </Route>
    
    
    </Routes>
    </div>
  </Router>  );
}

export default App;
