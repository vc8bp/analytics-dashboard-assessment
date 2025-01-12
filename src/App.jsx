import { useEffect, useState } from 'react'
import './App.css'
import getCsvData from './lib/readCsv'
import Home from "./pages/home/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar/NavBar'
import VahicalTable from "./pages/tables/VahicalTable"
import Map from './pages/map/Map'

function App() {
  const [data, setData] = useState({ rows: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCsvData();
        setData(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/map" element={<Map data={data.rows} />} />
          <Route path="/table" element={<VahicalTable data={data.rows} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
