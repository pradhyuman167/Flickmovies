import React from 'react'
import LazyLoad from 'react-lazy-load'
export default function Showitems(props) {
  return (
    <>
     <div className="card">
  <div className="content">
    <div className="back">
        <LazyLoad offset={50}>
           <img src={`https://image.tmdb.org/t/p/original${props.poster}`} style={{height:"inherit",width:"inherit"}}/>
        </LazyLoad>
      </div>
    <div className="front">
      
      <div className="img">
      <LazyLoad offset={50}>
           <img src={`https://image.tmdb.org/t/p/original${props.poster}`} style={{height:"inherit",width:"inherit"}}/>
        </LazyLoad>
        <div className="circle">
        </div>
        <div className="circle" id="right">
        </div>
        <div className="circle" id="bottom">
        </div>
      </div>

      <div className="front-content">
        <div className="description">
          <div className="title">
            <h4 style={{fontFamily: 'Bebas Neue',letterSpacing:"1.5px"}}>
              <strong>{props.name}</strong>
            </h4>
          </div>
         
          <h4 style={{fontFamily: 'Bebas Neue'}}><span>{props.rating}</span>/10</h4>
  
        </div>
      </div>
    </div>
    </div>
  </div>
      
    </>
  )
}
