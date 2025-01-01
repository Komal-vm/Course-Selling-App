import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
function Appbar(){

    const navigate = useNavigate()
    const[userEmail,setuserEmail]= useState(null);
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://localhost:4000/admin/me", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await response.json();
          setuserEmail(data.username)
        };
      
        fetchData();
      }, []); // Empty dependency array to run this effect only once
      

    if(userEmail){
        return(
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                padding:4
            }}>
            
            <div>
                 <Typography variant="h4">Coursera</Typography>
           
           </div>
           <div style={{display:"flex"}}>
           <div style={{paddingRight:20}}>
            <Typography variant="h6">{userEmail}</Typography>
           </div>
            <div style={{paddingRight:50}}>
                 
                 <Button variant="contained"   onClick={()=>{
                    localStorage.setItem("token",null);
                    window.location='/signup'//using wind instead of navigate here so that username doesnt print after comingg back to sign up page
                 }}>log out</Button>
                 
               
    
                 
            </div>
           </div>
           
                  
        </div>
            
        )

    }
    return(
        <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>
                <Typography variant="h3">Coursera</Typography>
          
              </div>
              <div style={{display:"flex",padding:4}}>
              <div style={{marginRight:20}}>
               <Button variant="contained"  onClick={()=>{
                navigate('/signup')
               }}>Signup</Button>
             </div>
             <div style={{marginRight:50}}>
               <Button variant="contained" onClick={()=>{
                navigate('/signin')
               }}>Signin</Button>
             </div>
              </div>
            
        </div>
      
        
    )
}
export default Appbar;