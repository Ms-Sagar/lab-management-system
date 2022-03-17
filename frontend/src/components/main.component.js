import { BrowserRouter as Router,Routes,Route, Link} from "react-router-dom";
import React from 'react';
import img1 from "./images/studentlogin.jpg" ;
import img2 from "./images/teacherlogin.jpg";

import Student from "./student.component"
import Teacher from "./teachers.component"
import "./main.component.css"

function Main() {
  return (
  
    <div className="main"  >
       
    
        <Link to='/Teacher'><img src={img1} ></img>    </Link>  
        <Link to='/Student'><img src={img2} ></img></Link>  
         
    </div>
 

    );
}

export default Main;