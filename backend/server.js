const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let ADMIN=[]
let COURSES=[]
let USER=[]


try{
    ADMIN = JSON.parse(fs.readFileSync('admin.json','utf-8'))
    COURSES = JSON.parse(fs.readFileSync('courses.json','utf-8'))
    USER = JSON.parse(fs.readFileSync('user.json','utf-8'))


}catch{
    ADMIN = [];
    COURSES = [];
    USER = []
}

const SECRET = "my secret"

const athenticatejwt=(req,res,next)=>{
    const authheader = req.headers.authorization;//small a here for authentication
    if(authheader){
        const token = authheader.split(' ')[1];
        jwt.verify(token,SECRET,(err,data)=>{
            if(err){
              return res.sendStatus(403);
            }
            req.user = data;
            next();
        })
    }
    else{
        res.sendStatus(401)
    }
    
};


app.post('/admin/signup',(req,res)=>{
    const {username,password} = req.body;
    const admin = ADMIN.find(a=>a.username===username);
    if(admin){
        res.status(403).json('admin  already exists');
    }
    else{
        const newAdmin = {username,password};
        ADMIN.push(newAdmin);
        fs.writeFileSync('admin.json',JSON.stringify(ADMIN));
        const token = jwt.sign({username,role:'admin'},SECRET,{expiresIn:'1h'})
        res.json({message:'admin created successfully',token})
    }
})

app.get('/admin/me',athenticatejwt,(req,res)=>{
    res.json({
        username:req.user.username
    })
})

app.post('/admin/signin',(req,res)=>{
    const {username,password} = req.body;
    const admin = ADMIN.find(a=>a.username === username && a.password === password)
    if(admin){
        const token = jwt.sign({username,role:'admin'},SECRET,{expiresIn:'1h'})
        res.json({message:'logged in successfully',token})
    }
    else{
        res.sendStatus(403).json('invalid credentials')
    }
})

app.post('/admin/courses',athenticatejwt,(req,res)=>{
      const course = req.body;
      course.id = COURSES.length+1;
      COURSES.push(course);
      fs.writeFileSync('courses.json',JSON.stringify(COURSES));
      res.json({message:'course created successfully',courseid:course.id})
})

app.get('/admin/courses',athenticatejwt,(req,res)=>{
    res.json(
        {courses:COURSES}
    )
})
app.put('/admin/courses/:courseid',athenticatejwt,(req,res)=>{
    const course = COURSES.find(c => c.id === parseInt(req.params.courseid));//parseInt(req.params.courseid) converts it from a string (default for route parameters) to an integer.
    if (course) {
      Object.assign(course, req.body);
      fs.writeFileSync('courses.json', JSON.stringify(COURSES));
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
})

app.post('/users/signup',(req,res)=>{
    const { username, password } = req.body;
    const user = USER.find(u=>u.username===username);
    if(user){
         res.status(403).json({message:'user  already exists'});
    }
    else{
        const newUser = {username,password};
        USER.push(newUser);
        fs.writeFileSync('user.json',JSON.stringify(USER))
        const token = jwt.sign({username,role:'user'},SECRET,{ expiresIn: '1h' })
        res.json({message:'user created successfullt',token})
    }

})
// User routes
app.post('/users/signin',(req,res)=>{
    const {username,password} = req.body;
    const user = USER.find(u=>u.username === username && u.password === password);
    if(user){
        const token = jwt.sign({username,role:'user'},SECRET,{expiresIn:'1h'})
        res.json({message:"logged in successfull",token})
    }

    else{
       res.status(403).json({message:"user invalid"})   
    }
})

app.get('/user/me',athenticatejwt,(req,res)=>{
  res.json({
      username:req.user.username
  })
})
  
app.get('/users/courses', athenticatejwt, (req, res) => {
    res.json({ courses: COURSES });
  });

  app.post('/users/courses/:courseId', athenticatejwt, (req, res) => {
    const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
    if (course) {
      const user = USER.find(u => u.username === req.user.username);
      if (user) {
        if (!user.purchasedCourses) {
          user.purchasedCourses = [];
        }
        user.purchasedCourses.push(course);
        fs.writeFileSync('users.json', JSON.stringify(USER));
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

  app.get('/users/purchasedCourses', athenticatejwt, (req, res) => {
    const user = USER.find(u => u.username === req.user.username);
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });

app.listen(4000,()=>{
    console.log('app listening on port 4000')
})