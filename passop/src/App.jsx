import './App.css'
import Footer from './components/Footer'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
         <Navbar/>
         {/* <div className="min-h-[84vh]"> */}
         <Manager/>
         {/* </div> */}
         <Footer/>
    </>
  )
}

export default App
