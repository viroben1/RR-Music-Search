import {useEffect, useState} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'

const ArtistView = () => {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
        }
        fetchData()
    }, [id])

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')
    const renderAlbums = justAlbums.map((album, i) => { 
                            return (
                                <div key={i}>
                                    <Link to={`/album/${album.collectionId}`}>
                                        <p>{album.collectionName}</p>
                                    </Link>
                                </div>)
                                })
    
    

    return (
        <div>
            {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <p>loading...</p>}
            {renderAlbums}
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => navigate('/')}>Home</button>
         </div>
    )
}

export default ArtistView