
import {Route, BrowserRouter, Routes } from "react-router-dom";
import { HomePage } from "./pages/homepage";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>

  )
}