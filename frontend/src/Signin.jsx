import { Typography } from "@mui/material"
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Button from "@mui/material/Button";
function Signin(){
    const[email,setEmail]=useState("");
    const[password,setPassword] = useState("");
    return(
       
        <div >
             {email}

            {password}
        <div style={{marginBottom:20,marginTop:170}}>
            <Typography  variant="h4" style={{display:"flex",justifyContent:"center"}}>Welcome to Coursera. Signin below</Typography>
        </div>
        <div style={{display:"flex",justifyContent:"center",padding:4}}>
        <Card variant="outlined" style={{width:500,padding:20}} >
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth  onChange={(e)=>{
              setEmail(e.target.value)
        }} />
        <br></br><br></br>
         <TextField id="outlined-basic" label="Password" variant="outlined" type="password" fullWidth  onChange={(e)=>{
              setPassword(e.target.value)
        }} />
        <br></br><br></br>
        <Button variant="contained" onClick={()=>{
         const fetchdata = async()=>{
            const response = await fetch("http://localhost:4000/admin/signin",{
                method:"POST",
                body:JSON.stringify({
                    username:email,
                    password:password
                }),
                headers:{"Content-Type":"application/json"}
            })
              const data = await response.json();
              localStorage.setItem("token",data.token)
              window.location='/'
         }
         fetchdata();
        }}>Sign in</Button>
        </Card>
        </div>
       
        </div>
    )
}

export default Signin