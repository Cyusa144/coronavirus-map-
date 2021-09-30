import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';
import DeleteNews from './DeleteNews';

const News = ({ data, isOneNews, isOwn }) => {
  const { title, image, content } = data;
  return (
    <div className="flex flex-col space-y-4 items-center w-full">
      <div className="flex rounded-sm bg-gray-200 md:h-64 flex-col space-y-4 md:space-x-8 md:space-y-0 md:flex-row items-stretch w-full">
          <img className="w-full md:w-1/3 h-full object-cover" src={image} alt="newsImage" />
       
        <div className="flex px-4 py-6 space-y-2 flex-col items-center md:w-2/3 w-full">
          <h1 className="font-medium tracking-wider text-justify text-xl text-gray-800">{isOneNews ? title : `${title.slice(0, 55)}`}</h1>
          <p className="text-justify text-gray-700">{isOneNews ? content : `${content.slice(0, 200)}...`}</p>
          {!isOneNews && <Link className="px-6 py-1 rounded-full hover:bg-blue-300 text-gray-200 bg-blue-600" to={`/news/${data._id}`}>Read more+</Link>}
        </div>
      </div>
      <div className="flex space-y-4 px-4 flex-col items-center w-full">
        <div className="flex items-center justify-between w-full">
          <p className="flex space-x-1 items-center">
            <button className="text-red-800 text-2xl" title="Likes"><FontAwesomeIcon icon={faHeart} /></button>
            <span>{data.favoriteCount}</span>
          </p>
          <p className="text-gray-700"><em>by</em> <span className="capitalize">{data.author.firstName}</span></p>
        </div>
        {isOwn && <div className="flex items-center justify-between w-full">
          <Link className="bg-blue-600 text-white rounded px-8 py-2" to={`/edit/${data._id}`}>Edit</Link>
          <DeleteNews newsId={data._id} />
        </div>}
      </div>
    </div>
  )
}

export default News;
