import Hero from './components/HeroSection';
import CoursesSection from './components/courses';
import Footer from './components/Footer';
import About from './components/AboutSection';
import Navbar from "./components/customUi/Nav"

function App() {
  return (
    <>
    <Navbar />
     <Hero />
     <About />
     <CoursesSection /> 
     <Footer />
    </>
  );
}

export default App;
