import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Usercourses(){
    const[courses,setCourses]= useState([])

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://localhost:4000/users/courses", {
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
            return<Todo key={a.id} a={a}/>//sub function

         })}
        </div>
    )

}
export function Todo(props){
    const handlePurchase = async () => {
        const response = await fetch(
          `http://localhost:4000/users/courses/${props.a.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        alert("Course purchased!");
      };
   return(
    <Card style={{
        margin:10,
        width:300,
        minHeight:200,
        
    }}>
        <Typography variant="h6" textAlign={"center"}>{props.a.title}</Typography>
        <Typography variant="subtitle1" textAlign={"center"}>{props.a.description}</Typography>
        <img src={props.a.imageLink} style={{width:300,height:200}}></img>
        <Button variant="contained" onClick={handlePurchase}>Purchase Course</Button>
        </Card>
   )
}

export default Usercourses;