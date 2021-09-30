import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import NewsFeed from '../components/NewsFeed';
import { fetchNews } from '../store/actions/news';

const NewsPage = (props) => {
  const { news, loading, error, onFetchNews } = props;
  useEffect(() => {
    document.title = 'My News — Pendemic';
    onFetchNews();
  }, [onFetchNews]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (news && news.length !== 0) {
    return <NewsFeed news={news} />;
  } else {
    return <p>No news yet</p>;
  }
}

const mapStateToProps = (state) => ({
  loading: state.covidData.loading,
  error: state.covidData.error,
  news: state.news.news
})

const mapDispatchToProps = (dispatch) => ({
  onFetchNews: () => dispatch(fetchNews()),
});

export default connect( mapStateToProps, mapDispatchToProps )( NewsPage );
