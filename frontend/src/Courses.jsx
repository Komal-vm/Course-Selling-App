import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Courses(){
    const[courses,setCourses]= useState([])

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
      
    return (
       
        <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
         
         {courses.map(a=>{
            return<Todo a={a}/>//sub function

         })}
        </div>
    )

}
export function Todo(props){
   return(
    <Card style={{
        margin:10,
        width:300,
        minHeight:200
        
    }}>
        <Typography variant="h6" textAlign={"center"}>{props.a.title}</Typography>
        <Typography variant="subtitle1" textAlign={"center"}>{props.a.description}</Typography>
        <img src={props.a.imageLink} style={{width:300,height:200}}></img>
    </Card>
   )
}

export default Courses;