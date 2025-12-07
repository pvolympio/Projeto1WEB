import Header from "./Header"
import Footer from "./Footer"
import Login from "./Login"
import Dashboard from "./Dashboard"
import CreateUser from "./CreateUser" 
import PrivateRoute from "./PrivateRoute" // <--- Importar
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/create-user" element={<CreateUser/>} />
        
        {/* Rotas Protegidas */}
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard/>} />
        </Route>

      </Routes>
      <Footer/>
    </>
  )
}

export default App