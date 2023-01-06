
import './App.css';
import {
  Center,
  AppShell,
  Header,
  Image
} from '@mantine/core';
import Content from "./components/content"
import { AnimateKeyframes }  from 'react-simple-animate';
import { Routes, Route, Outlet, BrowserRouter, Link } from 'react-router-dom'
import Product from './components/product';
import { motion } from 'framer-motion';
import ErrorNotFound from './components/error404';



export default function App() {
  return (
    <BrowserRouter>
    <div> 
         <AppShell
      
      header={
        
        <Header height={{ base: 50, md: 70 }} p={0}>
          <AnimateKeyframes
    play={true}
    duration={5} 
    delay={0} 
    iterationCount="infinite"
    direction="alternate"
    keyframes={["background-color: #264653;", "background-color: #2a9d8f", "background-color: #e9c46a", "background-color: #f4a261", "background-color: #e76f51" ]}
    easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
    ><Link to="/">
          <motion.div 
animate={{scale: [0, 1]}}
transition={{duration: 1}}
><div style={{ display: 'flex', alignItems: 'center', height: '70px' }}>
  
          
            <Image
            height={50}
            fit="contain"
            src="../images/logo/logo.png"
            ></Image>
                      </div>
                      </motion.div>
          </Link>
          </AnimateKeyframes>
          </Header>
      }
        
       > 
  <Routes>
    
    <Route path="/" element={<Content/>} />
    <Route path="/product/:productid" element={<Product />} />
    <Route path="*" element={<ErrorNotFound />} />

  </Routes>
  
    
    
      <Center>
      
    <Outlet />
    
      </Center>
       
    </AppShell>
    <AnimateKeyframes
    play={true}
    duration={5} 
    delay={0} 
    iterationCount="infinite"
    direction="alternate"
    keyframes={["background-color: #264653;", "background-color: #2a9d8f", "background-color: #e9c46a", "background-color: #f4a261", "background-color: #e76f51" ]}
    easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
    ><div style={{ height: "60px"}}>
          Application footer
          </div>
</AnimateKeyframes>
    </div>
</BrowserRouter>
  );
}
