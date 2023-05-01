// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.jsx'
import './index.css'

// resize for scaling the board size
window.addEventListener("resize", onResize);
// set size on startup
onResize();

function onResize() {
  // get actual vh on mobile
  document.body.style.setProperty("--vh", window.innerHeight + "px");
  // console.log("Resize");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
