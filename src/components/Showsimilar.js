import React from 'react'
import Showitems from './Showitems'
import { Link } from 'react-router-dom'

export default function Showsimilar(props) {
  return (
    <>
    <div style={{display:"flex",flexDirection:"column"}}> 
    
    <div style={{background:"black"}}> 
    <h3 style={{paddingLeft:"3rem",paddingTop:"2rem",color:"white",paddingBottom:"2rem"}}>
        You Should also watch...
    </h3>
    </div>
    <div style={{background:"black"}} className='row align-content-center justify-items-center g-2'>
        { props.items ? props.items.similar.results.slice(0,20).map((element)=>{
            return (
                <Link key={element.id} style={{padding:"5px"}} to={`/show/${element.id}`} state={{id:element.id}} preventScrollReset={true} className='col-md-2 col-3 col-sm-3'>
            <Showitems poster={element.poster_path} rating={element.vote_average} name={element.original_title} date={element.release_date} />
        </Link>
            )
        }):"Loading..."}
    </div>
        </div>
    </>
  )
}
