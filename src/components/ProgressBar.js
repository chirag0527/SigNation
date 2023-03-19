import React, { useState } from 'react';



export default function ProgressBar({number}) {
    const [opacity,setOpacity] = React.useState({});
    let increment = 250;

    if(2*increment < number+1){
      while(2*increment < number+1){
        increment*=2;
      }
    }

    setTimeout(()=>{
        const newOpacity = 1
        setOpacity(opacity,newOpacity);
    },1000)

  return (

    <div className='mt-4'>
      <div className="progress" style={{
          background: '#D9D9D9',
          justifyContent: 'flex-start',
          borderRadius: '100px',
          alignItems: 'center',
          display: 'flex',
          height: '10px',
      }
          
      }>
          <div className="progress-value" style={{
              boxShadow: '0 10px 40px -10px #fff',
              borderRadius: '100px',
              background: 'linear-gradient(270deg, #191089 -8.05%, rgba(25, 16, 137, 0) 105.62%, #6D64CA 105.62%)',
              height: '30px',
              width: `${number/(2*increment)*100}%`,

          }}></div>
          
      </div>
      <div className='flex justify-between'>
      <div className='w-[150px]'>
        <span className='font-bold f'>{number}</span> people have already signed
      </div>
      <div>
        <span className='font-bold'>{2*increment}</span> signatures goal
      </div>
    </div>
    </div>
  )
}

