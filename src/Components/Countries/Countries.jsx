import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' 
import { Image } from 'antd';
import './Countries.css'
import { TfiBackLeft } from "react-icons/tfi";

function Countries() {
    const params=useParams()
    console.log(params);
    const [data,setData]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        fetch(`https://restcountries.com/v3.1/alpha/${params.id}`)
        .then(res=>res.json())
        .then(info=>setData(info))
    },[params.id])
  return (
    <div className='infocountry'>
        <h1>{data[0]?.name.common}</h1>
        <Image className='countryflag' src={data[0]?.flags.svg} alt="" />
        <h3>Population: {data[0]?.population}</h3>
        <h3>Capital: {data[0]?.capital}</h3>
        <p>Neighbouring Countries</p>
        {
            data[0]?.borders.map(item => <button className='buttonborder' onClick={()=>navigate(`/${item}`)}>{item}</button>)
        }
        <br/>
        <br/>
        <button className='buttonback' onClick={()=>navigate("/")}><TfiBackLeft /></button>
    </div>
  )
}

export default Countries