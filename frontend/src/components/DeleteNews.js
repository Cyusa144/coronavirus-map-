import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { fetchNews } from '../store/actions/news';

const DeleteNews = props => {
  const { push } = useHistory();
  const {newsId, token, onFetchNews} = props;

  const handleClick = () => {
    const config = {
      headers: {
        "Authorization": token,
      }
    };
    axios
      .delete(`http://localhost:4000/api/news/${newsId}`, config)
      .then(response => {
        onFetchNews();
        push('/mynews');
      })
      .catch(err => console.log(err));
  }
  return (
    <button
      onClick={handleClick}
      type="button"
      className="bg-red-900 text-white rounded px-8 py-2"
    >Delete</button>
  )
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchNews: () => dispatch(fetchNews()),
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( DeleteNews ));
