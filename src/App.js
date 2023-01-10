import './App.css';
import { Fragment,useEffect, useState,Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { createResource as fetchData } from './helper'
import Spinner from './components/Spinner'

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState([null])
  let [message, setMessage] = useState('Search for Music!')
  

  const API_URL = `https://itunes.apple.com/search?term=`
  

  useEffect(() => {
    if (searchTerm) {
        setData(fetchData(searchTerm))
    }
}, [searchTerm])


  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      const fetchData = async () => {
        const response = await fetch(API_URL + searchTerm)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
  }
  }, [searchTerm,API_URL])

  const handleSearch = (e, term) => {
    e.preventDefault()
    
    setSearchTerm(term)
    
  }
  const renderGallery = () => {
    if(data) {
        return (
            <Suspense fallback={<Spinner />}>
                <Gallery data={data} />
            </Suspense>
        )
    }
}

  return (
    <div className="App">
      {message}
	  {renderGallery()}
      <Router>
		<Routes>
		<Route path='/' element={
						<Fragment>
							<SearchBar handleSearch = {handleSearch}/>
					</Fragment>
					} />
					<Route path='/album/:id' element={<AlbumView />} />
					<Route path='/artist/:id' element={<ArtistView />} />
           </Routes>
      </Router>
    </div>
  );
}

export default App;


