import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const AlbumView = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [ albumData, setAlbumData ] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `http://localhost:4000/song/${id}`
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])
    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })


    return (
        <div>
           {renderSongs}
           <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    )


   
}

export default AlbumView