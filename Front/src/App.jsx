import Header from "./Header"
import Footer from "./Footer"
import Login from "./Login"
import Dashboard from "./Dashboard"
import CreateUser from "./CreateUser" 
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/create-user" element={<CreateUser/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App