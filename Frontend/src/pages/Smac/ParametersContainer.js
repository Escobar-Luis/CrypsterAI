import React from 'react'

function ParametersContainer(props) {
  return (
    <nav className='w-full'>
      <div className=' flex bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 border border-white rounded-full'>{props.children}</div>
      {/* <div className='flex-col-2 flex gap-1 bg-gradient-to-tr from-blue-500 via-transparent to-pink-500 border border-white rounded-full w-min'>{props.children}</div> */}
        
    </nav>
  )
}

export default ParametersContainer