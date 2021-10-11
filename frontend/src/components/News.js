import React, { useState } from 'react';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import DeleteNews from './DeleteNews';
import Typography from '@material-ui/core/Typography';
import Comments from './Comments';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';









const News = ({ data, isOneNews, isOwn }) => {
  const { title, image, content } = data;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    setComment('');
    setFirstName('');
    setLastName('');
    const obj = {
      firstName,
      lastName,
      content: comment
    };
    setComments([...comments, obj])
  }
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
      <div className="comments-section" style={{ display: 'flex', flexDirection: 'column' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item>
              <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </Grid>
            <Grid item>
              <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Grid>
          </Grid>
          <textarea id="text" name="textarea" rows="4" cols="70" placeholder="write a comment" value={comment} onChange={e => setComment(e.target.value)} style={{ border: '1px solid rgb(59, 130, 242)', padding: '5px', margin: '20px 0' }}>
          </textarea>
          <button style={{ backgroundColor: 'rgb(59, 130, 242)', color: 'white', padding: '10px', width: '100px', borderRadius: '5px', float: 'left' }}>Add</button>
        </form>
        {
          comments.map((comment, name) => {
            return <Comments firstName={comment.firstName} lastName={comment.lastName} content={comment.content} />
          })
        }
      </div>
    </div>
  )
}

export default News;
