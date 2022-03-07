import React from 'react'

function Parameters() {
  return (
    <div className='border grid grid-cols-3 text-center'>
<button class="
  relative 
  flex jutify-center items-center 
  bg-gray-500 text-white 
  focus:ring ring-gray-300 
  focus:outline-none
  rounded border shadow group
">
  <p class="px-3 xs:px-4">Daily</p>
  <span class="border-l border-gray-400  hover:bg-gray-500">
    <svg 
      class="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M19 9l-7 7-7-7"
        ></path>
    </svg>
  </span>
  <div class="
    absolute top-full 
    hidden group-focus:block 
    min-w-full w-max 
    bg-gray-600 shadow-md 
    mt-1 rounded
  ">
    <ul class="text-left border rounded">
      <li class="px-4 py-1 hover:bg-gray-700 border-b border-gray-500">
        coming soon
      </li>
      {/* <li class="px-4 py-1 hover:bg-gray-700 border-b border-gray-500">
        menu list 2
      </li>
      <li class="px-4 py-1 hover:bg-gray-700 border-b border-gray-500">
        menu list 3
      </li>
      <li class="px-4 py-1 hover:bg-gray-700 border-b border-gray-500">
        menu list 4
      </li>
      <li class="px-4 py-1 hover:bg-gray-700">
        menu list 5
      </li> */}
    </ul>
  </div>
</button>
        <div className="border">
            Date
        </div>
        <div className="border">
            SMA Length
        </div>
    </div>
  )
}

export default Parameters