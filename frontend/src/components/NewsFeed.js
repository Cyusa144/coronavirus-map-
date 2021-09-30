import React from 'react';
import News from './News';

const NewsFeed = ({ news, isOwn }) => {

  return (
    <div className="grid grid-cols-1 gap-x-4 py-8 gap-y-6 md:grid-cols-2 max-w-5xl mx-auto w-full">
      {news.map(element => (
        <News isOwn={isOwn} data={element} />
      ))}
    </div>
  );
};


export default NewsFeed;