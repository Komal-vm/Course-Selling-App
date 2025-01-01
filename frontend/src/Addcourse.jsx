
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Button from "@mui/material/Button";
 function Addcourse(){
    const[title,setTitle]=useState("");
    
    const[description,setdescription]=useState("")
    const[image,setImage]=useState("")

    return(

       
        <div >
             
        <div style={{marginBottom:20,marginTop:170}}>
            <Typography  variant="h4" style={{display:"flex",justifyContent:"center"}}>Addcourse here</Typography>
        </div>
        <div style={{display:"flex",justifyContent:"center",padding:4}}>
        <Card variant="outlined" style={{width:500,padding:20}} >
        <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth  onChange={(e)=>{
              setTitle(e.target.value)
        }} />
        <br></br><br></br>
         <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth  onChange={(e)=>{
              setdescription(e.target.value)
        }} />
        <br></br><br></br>
         <TextField id="outlined-basic" label="ImageLink" variant="outlined" fullWidth  onChange={(e)=>{
              setImage(e.target.value)
        }} />
        <br></br><br></br>
        <Button variant="contained" onClick={()=>{
         const fetchdata = async()=>{
            const response = await fetch("http://localhost:4000/admin/courses",{
                method:"POST",
                body:JSON.stringify({
                    title:title,
                    description:description,
                    imageLink:image,
                    published:true
                }),
                headers:{"Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            })
              const data = await response.json();
              console.log(data);
              alert('course added!')
              
         }
         fetchdata();
        }}>Add course</Button>
        </Card>
        </div>
       
        </div>
    )
}

export default Addcourse