import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import News from '../components/News';
import { fetchNews } from '../store/actions/news';

const SingleNews = (props) => {
  let id = props.match.params.id;
  const { loading, error, data, onFetchNews } = props;
  useEffect(() => {
    onFetchNews();
  }, [onFetchNews])

  let news = [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! news not found</p>;
  if (data && data.length !== 0) {
    news = data.filter(el => el._id === id);
    return (
      <div className="py-8 bg-gray-200 px-4">
        <News isOneNews={true} data={news[0]} />
      </div>
    )
  } else {
    return <p>News not found</p>
  }
};

const mapStateToProps = (state) => ({
  loading: state.news.loading,
  error: state.news.error,
  data: state.news.news
})

const mapDispatchToProps = (dispatch) => ({
  onFetchNews: () => dispatch(fetchNews()),
});

export default connect( mapStateToProps, mapDispatchToProps )( SingleNews );

