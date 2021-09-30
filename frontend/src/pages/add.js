import axios from 'axios';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import NewsForm from '../components/NewsForm';

const AddNews = (props) => {
  const { push } = useHistory();
  const { token } = props;
  let { loading, error } = props;

  useEffect(() => {
    document.title = 'Add News - Pendemic desease';
  }, []);

  const handleSubmit = (data) => {
    loading = true;
    const formData = new FormData();
    formData.append("image", data.variables.image);
    formData.append("title", data.variables.title);
    formData.append("content", data.variables.content);
    console.log(formData);
    const config = {
      headers: {
        "Authorization": token,
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post('http://localhost:4000/api/news', formData, config)
      .then(response => {
        push('/mynews');
      })
      .catch(err => {error = true});
  }

  return (
    <div className="flex flex-col space-y-2 px-4 items-center my-8 bg-gray-200 rounded-sm shadow-sm py-8 max-w-4xl mx-auto w-full">
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the news</p>}
      <h1 className="text-xl font-medium text-center text-blue-700">What do you know about Covid-19?</h1>
      <NewsForm action={handleSubmit} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

export default connect( mapStateToProps )( AddNews );
