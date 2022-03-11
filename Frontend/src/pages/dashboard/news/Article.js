import React from 'react'

import moment from 'moment';
moment().format();

function Article({art}) {
    return (
        <div>
            <div className="article-container border-2 border-white rounded-xl text-white bg-black p-3 h-[12rem]">
                <div className="grid grid-cols-2 gap-2 items-start justify-center">
                    <div className="article-image-container flex items-center justify-center ">
                        <img className="article-image h-[10rem] rounded-xl" src={art.media} alt="N/A" />
                    </div>
                    <div className='flex flex-col gap-3 '>
                        <div className="article-text-box-1 text-xs">
                            <a className="article-title-link underline " href={art.link} target="_blank" rel="noreferrer"><h1 className="article-title">{art.title}</h1></a>
                        </div>
                        <div className="article-text-box-2 text-[0.5rem] flex justify-start items-center border p-1 rounded-full w-max tracking-wider">
                        <p className="news-source">{art.link.split('/')[2]}</p>
                            <span className="article-bullet">&bull;</span>
                            <p className="article-time ">{moment(art.published_date).fromNow()}</p>
                        </div>

                    </div>
                {/* <div className="article">
                    <div className="article-text text-center ">
                            <p className="article-decription">{art.summary.slice(0, 225)+"..."}</p>
                    </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Article