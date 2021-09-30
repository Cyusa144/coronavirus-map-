import axios from 'axios';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import NewsForm from '../components/NewsForm';
import { fetchNews } from '../store/actions/news';

const EditNews = (props) => {
  const id = props.match.params.id;
  const { push } = useHistory();
  const { token } = props;
  let { loading, error, onFetchNews, news } = props;

  useEffect(() => {
    document.title = 'Add News - Pendemic desease';
    onFetchNews();
  }, [onFetchNews]);

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
      .patch(`http://localhost:4000/api/news/${id}`, formData, config)
      .then(response => {
        push(`/news/${id}`);
      })
      .catch(err => {error = true});
  }

  let data = [];

  if (news && news.length !== 0) {
    data = news.filter(el => el._id === id);
  }

  return (
    <div className="flex flex-col space-y-2 px-4 items-center my-8 bg-gray-200 rounded-sm shadow-sm py-8 max-w-4xl mx-auto w-full">
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the news</p>}
      <h1 className="text-xl font-medium text-center text-blue-700">What do you know about Covid-19?</h1>
      <NewsForm 
        title={data[0].title}
        content={data[0].content}
        image={data[0].image}
       action={handleSubmit} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    news: state.news.news,
    token: state.auth.token,
    loading: state.news.loading,
    error: state.news.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchNews: () => dispatch(fetchNews()),
});

export default connect( mapStateToProps, mapDispatchToProps )( EditNews );
