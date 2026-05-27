import StudentProfile from "./component/StudentProfile";
export default function App()
{
  
  return(
    <div className="Parent">
  <StudentProfile name ="Ashish" branch="MCA" college="KJU" img="https://images.unsplash.com/photo-1779261309891-7ecf394d1452?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
  <StudentProfile name = "Amit" branch ="BCA" college="BHU" img="https://images.unsplash.com/photo-1773332585698-cba3c91b73e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3N3x8fGVufDB8fHx8fA%3D%3D"/>
  </div>
  )
}