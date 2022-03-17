import React from 'react';
import { BrowserRouter as Router,Routes,Route, Link} from "react-router-dom";

import log from './images/imgs.jpg';
 
function LOGO() {
  return (
     <Link to='/'><img src={log} ></img></Link>
  )
  ;
}

export default LOGO;
