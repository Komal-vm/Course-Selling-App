import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
function Eachcourse(){
    const[courses,setCourses]= useState([])
    let {courseid} = useParams()

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://localhost:4000/admin/courses", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await response.json();
          setCourses(data.courses);
        };
        fetchData();
      }, []);
    let c = null;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id == courseid) { 
            c = courses[i];
           
        }
    }
    if(!c){
        return(
            <div>Loading....</div>
        )
    }
    return(
        <div style={{display:"flex",justifyContent:"center"}}>
         <Coursecard c = {c}/>
         <Updatecard c= {c}/>
        </div>
    )

    function Updatecard(props){
    const c = props.c    
    const[title,setTitle]=useState("");
    
    const[description,setdescription]=useState("")
    const[image,setImage]=useState("")
        return (
        <div >
             
        <div>
            <Typography  variant="h4" style={{display:"flex",justifyContent:"center"}}>Update course details</Typography>
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
            console.log("Updating course with ID:", c.id);
         const fetchdata = async()=>{
            
            const response = await fetch("http://localhost:4000/admin/courses/" + c.id,{
                method:"PUT",
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
              alert('course updated!')
              window.location='/course/'+c.id
         }
         fetchdata();
        }}>Update course</Button>
        </Card>
        </div>
       
        </div>
        )


       
    }
    
    function Coursecard(props){
       const c = props.c;  
       return <div style={{display:"flex",justifyContent:"center"}}>
                  <Card style={{
            margin:10,
            width:300,
            height:300
            
            
        }}>
            <Typography variant="h6" textAlign={"center"}>{c.title}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>{c.description}</Typography>
            <img src={c.imageLink} style={{width:300,height:200}}></img>
        </Card>
       </div>
     
               
    }
}

export default Eachcourse;