import { form } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';

const NoteForm = props => {

  const [value, setValue] = useState({ 
    title: props.title || '',
    content: props.content || '',
    image: props.image || '',
    imagePreview: props.image,
  });

  const onChange = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    });
  };

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        setValue({
          ...value,
          imagePreview: reader.result,
          file: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <form
        className="space-y-6 w-full"
        onSubmit={e => {
          e.preventDefault();
          props.action({
            variables: {
              ...value,
              image: value.file,
            }
          });
        }}
      >
        <div className="flex space-y-1 flex-col items-start w-full">
          <label>Title</label>
          <input
            required
            name="title"
            className="py-2 px-1 rounded-sm focus:outline-none w-full" 
            onChange={onChange}
            value={value.title}
            type="text"
            placeholder="Enter news title..." />
        </div>
        <div className="flex space-y-1 flex-col items-start w-full">
          <label>Image</label>
          <div className="flex justify-between space-x-8 w-full">
            <input
            multiple
            accept="image/*"
            name="image"
            className="py-2 px-1 rounded-sm focus:outline-none w-1/3"
            onChange={onImageChange}
            type="file" placeholder="Add image..." />
            {value.imagePreview && <img className="h-32 w-2/3 rounded-sm shadow-md object-cover" src={value.imagePreview} alt="" />}
          </div>
        </div>
        <div className="flex space-y-1 flex-col items-start w-full">
          <label>Content</label>
          <textarea
          className="h-64 resize-none py-2 px-1 rounded-sm focus:outline-none w-full"
          required
          type="text"
          name="content"
          placeholder="News descritions..."
          value={value.content}
          onChange={onChange}
        />
        </div>
        <button className="bg-blue-600 px-16 rounded text-gray-200 font-medium text-xl tracking-wide hover:opacity-75 py-4" type="submit">Save</button>
      </form>
  );
};

export default NoteForm;
