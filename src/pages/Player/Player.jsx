import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

function Player() {

  const {id} = useParams()

  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name : "",
    key:"",
    published_at: "",
    type:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzYwNDQ0MGEwN2RmNTAzNzMwZjgyMDFkNGRiOGUyOSIsIm5iZiI6MTczNjQ4MDU5Ni4yNjMsInN1YiI6IjY3ODA5NzU0NzhjZmNkNzdlZDRlNTcxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FtYuAM3qYfpF-GIOudIyI7KnR52ok5c-AtvjG-mSdpI'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  }, [])



  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1`}
        title='trailer' frameBorder="0" allow='autoplay'></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
