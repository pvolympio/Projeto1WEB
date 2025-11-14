import Header from "./Header"
import Footer from "./Footer"
import Login from "./Login"
import Dashboard from "./Dashboard"
import CreateUser from "./CreateUser"
import { Routes, Route } from 'react-router-dom'
import "./styles/App.css"

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/create-user" element={<CreateUser/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App