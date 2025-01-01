import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Parchased(){
    const[parchased,setParchased]= useState([])

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://localhost:4000/users/purchasedCourses", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await response.json();
          setParchased(data.purchasedCourses);
        };
        fetchData();
      }, []);
      
    return (
       
        <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
         
         {parchased.map(a=>{
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

export default Parchased;
// import { Card, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

// function Parchased() {
//   const [parchased, setParchased] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("http://localhost:4000/users/purchasedCourses", {
//         method: "GET",
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       });
//       const data = await response.json();
//       setParchased(data.purchasedCourses); // Corrected the key to match the expected response
//     };
//     fetchData();
//   }, []);

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//       {parchased.map((a) => {
//         return <Todo key={a.id} a={a} />; // Added key for better React rendering
//       })}
//     </div>
//   );
// }

// export function Todo(props) {
//   return (
//     <Card
//       style={{
//         margin: 10,
//         width: 300,
//         minHeight: 200,
//       }}
//     >
//       <Typography variant="h6" textAlign={"center"}>
//         {props.a.title}
//       </Typography>
//       <Typography variant="subtitle1" textAlign={"center"}>
//         {props.a.description}
//       </Typography>
//       <img src={props.a.imageLink} style={{ width: 300, height: 200 }} />
//     </Card>
//   );
// }

// export default Parchased;
