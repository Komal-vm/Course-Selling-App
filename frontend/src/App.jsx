// import Addcourse from "./Addcourse";
// import Appbar from "./Appbar";
// import Signup from "./Signup";
// import Courses from "./Courses";
// import Eachcourse from "./Eachcourse";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signin from "./signin";
// import Usersignup from "./Usersignup";
// function App(){
//   return(
//     <div style={{width:"100vw",height:"100vh",backgroundColor:"#eeeeee"}} >
        
//         <Router>
//             <Appbar/>
//             <Routes>
//                 <Route path="/signin" element={<Signin/>}/>
//                 <Route path="/signup" element={<Signup/>} />
//                 <Route path="/addcourse" element={<Addcourse/>}/>
//                 <Route path="/courses" element={<Courses/>}/>
//                 <Route path="/course/:courseid" element={<Eachcourse/>}/>
//                 <Route path="/user/signup" element={<Usersignup/>}/>
//             </Routes>

//         </Router>
//         </div>
//   )
// }


// export default App;
import Addcourse from "./Addcourse";
import Appbar from "./Appbar";
import Signup from "./Signup";
import Courses from "./Courses";
import Eachcourse from "./Eachcourse";

import Usersignup from "./Usersignup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./signin";
import Userappbar from "./Userappbar";
import Usercourses from "./Usercourses";
import Parchased from "./Parchased";
function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/*" element={<AdminRoutes />} />

          {/* User Routes */}
          <Route path="/user/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

// Component for Admin Routes
function AdminRoutes() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addcourse" element={<Addcourse />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseid" element={<Eachcourse />} />
      </Routes>
    </>
  );
}

// Component for User Routes
function UserRoutes() {
  return (
    <>
      <Userappbar />
      <Routes>
        <Route path="signup" element={<Usersignup />} />
        <Route path="courses" element={<Usercourses/>}/>
        <Route path="parchased" element={<Parchased/>}/>

       
      </Routes>
    </>
  );
}

export default App;
