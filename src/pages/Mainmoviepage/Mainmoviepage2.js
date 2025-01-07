import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Movieitems from '../../components/Movieitems';
import Loader from '../../components/loader';
import LazyLoad from 'react-lazy-load';
import InfiniteScroll from 'react-infinite-scroller';
import '../../styles/moviepage.css'
import '../../styles/searched.css'

export default function Mainmoviepage2(props) {
    var option=['Now Playing','Popular','Top Rated','Upcoming'];
    const [opted,setOpted]=useState("now_playing");
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(false);
    const [input,setInput]=useState("");
    const [sdata,setSdata]=useState(null);
    const [selectedOptionText,setSelectedOptionText]=useState("Now Playing")
    const [page,setPage]=useState(1);

    const handleChange=(e)=>{
        let searchedContent=document.querySelector('.searched');
       if(e.target.value===""){
         
         setInput("");
         searchedContent.classList.remove('sactive');
       }else{
         searchedContent.classList.add('sactive');
         setInput(""+e.target.value);
       }
       const fetchdata=async ()=>{
         try {
           setLoading(true);
           const response= await fetch(`https://api.themoviedb.org/3/search/multi?query=${e.target.value}&include_adult=false&language=en-US&page=1`, props.options)
           const data=await response.json();
           
           setSdata(data.results);
           setLoading(false)
         } catch (err) {
           console.log(err);
                 }
             }   
             fetchdata();
           }
    const handleSelect = (e) =>{
        const selected=e.target.selectedIndex;
        const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedOptionText = selectedOption.innerText;
    setSelectedOptionText(selectedOptionText);

        if(selected===0){
            setOpted("now_playing")
        }
        else if(selected===1){
            setOpted('popular')
        }
        else if(selected===2){
            setOpted('top_rated')
        }
        else if(selected===3){
            setOpted('upcoming')
        }
    }
    useEffect(()=>{
        const fetchmovie=async ()=>{
            try {
                setLoading(true);
              const response= await fetch(`https://api.themoviedb.org/3/movie/${opted}?language=en-US&page=1`, props.options)
              const data=await response.json();
              
              setData(data.results);
              
              setLoading(false);
            } catch (err) {
              console.log(err);
                    }
                }   
                fetchmovie();
    },[opted])
    const fetchmore=async ()=>{
        try{
            const response= await fetch(`https://api.themoviedb.org/3/movie/${opted}?language=en-US&page=${page}`, props.options)
              const datarec=await response.json();
              
              setData(data.concat(datarec.results));
            
        
        }catch(err){
            console.log(err);
        }
    }
  return (
    <>
    <div  className='sec-2' >
        <div  className='sec-2-1'>

    <select onChange={handleSelect} >
        {option.map((option, index) => (
            <option key={index} value={option}>
                            {option}
                            </option>
                        ))}
</select>
<h2 style={{marginTop:"2rem",padding:"1rem",background:"black",color:'white',fontSize:"10px"}}>{selectedOptionText}</h2>
                        </div>
<div  className='sec-2-2' >
<svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

<input placeholder="Search" type="search" class="input" value={input} onChange={handleChange} style={{border:"1px solid"}}/>
<div className='searched'>
      { sdata ? 
      loading ? <Loader/> :
      sdata.slice(0,20).map((element)=>{
          if(element.title || element.name){
              return(  
                  <Link key={element.id} className='searchItems' to={element.media_type==='movie' ? `/movie/${element.id}` : `/show/${element.id}`} state={{id:`${element.id}`}}>
              <LazyLoad offset={50}> 
              <img src={`https://image.tmdb.org/t/p/original${element.poster_path}`}/>
              </LazyLoad>
              <div>
                <h3 style={{fontSize:"1.5rem"}}>{element.media_type==='tv' ? element.name : element.title}</h3>
                <p style={{fontSize: "1rem",lineHeight:"0.5"}}>Release: {element.media_type==="tv" ? element.first_air_date:element.release_date}</p>
                <p style={{fontSize: "1rem",lineHeight:"0.5"}}>{element.media_type}</p>

              </div>
              </Link>
            )
        }
    }): 
    ""}
    </div>
    </div>
    </div>
    {data ? 
    <InfiniteScroll
    pageStart={0} //This is important field to render the next data
    loadMore={fetchmore}
    hasMore={data.length!==100}
    loader={<Loader/>}
    >
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",overflow:"hidden"}}className='main-movieItems'>
        {data.map((element,index)=>{
            return (
                <Link className="col-md-2" key={index} style={{padding:"5px"}} to={`/movie/${element.id}`}>
                    <Movieitems poster={element.poster_path} rating={element.vote_average} name={element.original_title} date={element.release_date}/>
        </Link>
            )
        })}
        </div>
        </InfiniteScroll>
        : <Loader/> }

        </>
        )
    }
