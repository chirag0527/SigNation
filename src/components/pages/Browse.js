import React, { useEffect, useState } from 'react'
import { fetchStorage } from '../../utils/tzkt';
import Navbar from '../Navbar'
import CardP from './CardP'

export default function Browse() {
  const [petitions,setPetitions] = useState([]);

  useEffect(() => {
    
    (async () => {
      const data= await fetchStorage();
      const test = []
      Object.values(data).forEach((petition)=> {
        test.push({'title': petition.title, 'content': petition.content,'signatures': petition.signature, 'number':petition.key, 'img_hash':petition.img_hash})
      })
      setPetitions(test)
    })();
  }, []);
  console.log(petitions);
  return (
    <>
    <Navbar/>
    <div className=''>
      <h3 className='text-5xl font-extrabold mt-4 mb-4 text-black text-center'> Browse Other Petitons </h3>
      <div className='grid justify-items-center'>
      {petitions.slice(0).reverse().map((data,id)=>{ 
          return(
            <CardP id = {id} title={data.title} content = {data.content} signature = {data.signatures} number= {data.number} img_hash={data.img_hash}/>
          )
        })}
      </div>
    </div>
    </>
  )
}
