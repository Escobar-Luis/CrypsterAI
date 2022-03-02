import React from 'react';

function Bars({bar}) {
  return <div>
      <a href="#" class="flex text-white flex-col items-center px-4 group">
      <svg className='text-white'viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8935 5.33332H18.6668V3.99999C18.6668 3.26666 18.0668 2.66666 17.3335 2.66666H14.6668C13.9335 2.66666 13.3335 3.26666 13.3335 3.99999V5.33332H11.1068C10.1335 5.33332 9.3335 6.13332 9.3335 7.10666V27.5467C9.3335 28.5333 10.1335 29.3333 11.1202 29.3333H20.8802C21.8668 29.3333 22.6668 28.5333 22.6668 27.56V7.10666C22.6668 6.13332 21.8668 5.33332 20.8935 5.33332ZM19.4802 17.6533L15.9202 24.32C15.6002 24.92 14.6668 24.6933 14.6668 24V19.3333H13.1068C12.9909 19.3336 12.877 19.3037 12.7762 19.2466C12.6754 19.1894 12.5912 19.107 12.532 19.0074C12.4728 18.9078 12.4405 18.7944 12.4384 18.6786C12.4364 18.5627 12.4645 18.4483 12.5202 18.3467L16.0802 11.68C16.4002 11.08 17.3335 11.3067 17.3335 12V16.6667H18.8935C19.3868 16.6667 19.7202 17.2 19.4802 17.6533Z"/>
</svg>
        <span class="text-gray-600 text-xxxs mt-1.5 group-hover:text-red">
          { bar.title }
        </span>
      </a>
      <svg
        class=" fill-current text-blue-900 absolute top-0 bottom-0 right-0 translate-x-3/4"
        width="83"
        height="86"
        viewBox="0 0 83 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path       
          d="M18.6971 8.65669C14.1374 3.17225 7.37457 0 0.242245 0H0V86H83L18.6971 8.65669Z"
        />
      </svg>
  </div>;
}

export default Bars;
