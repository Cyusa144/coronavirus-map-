import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewsFeed from '../components/NewsFeed';
import { fetchNews } from '../store/actions/news';

const MyNews = (props) => {
  const { news, loading, error, onFetchNews, userInfo } = props;
  useEffect(() => {
    document.title = 'My News — Pendemic';
    onFetchNews();
  }, [onFetchNews]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (news && news.length !== 0) {
    const myNews = news.filter(el => el.author._id === userInfo.id)
    if(!myNews[0]) {
      return <p className="py-8">Add news by just one click <Link className="ml-2 text-blue-600 font-medium" to="/add">Add news</Link></p>
    }
    return <NewsFeed isOwn={true} news={myNews} />;
  } else {
    return <p>No news yet</p>;
  }
}

const mapStateToProps = (state) => ({
  userInfo: JSON.parse(state.auth.userInfo),
  loading: state.news.loading,
  error: state.news.error,
  news: state.news.news
})

const mapDispatchToProps = (dispatch) => ({
  onFetchNews: () => dispatch(fetchNews()),
});

export default connect( mapStateToProps, mapDispatchToProps )( MyNews );
