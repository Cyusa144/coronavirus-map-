import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filter, search } from '../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSearchLocation, faVirus, faCaretDown, faRss } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useHistory, withRouter } from 'react-router-dom';
import { logout } from '../store/actions/auth';

const Header = (props) => {
    const {location: {pathname}} = useHistory();
    const [toggle, setToggle] = useState(false);
    const {replace} = useHistory();
    let { searchCountry, filterData, onLogout, isAuthenticated, userInfo } = props;
    const [countryName, setCountry] = useState('');
    const [sort, setSort] = useState('');
    useEffect(() => {
        searchCountry(countryName);
        console.log(countryName);
    }, [countryName, searchCountry]);
    useEffect(() => {
        filterData(sort);
    }, [filterData, sort]);
    return (
        <header className="App-header w-full md:shadow-md flex flex-col items-center">
            <div className="max-w-5xl w-full">
                <nav className="flex flex-col md:flex-row space-y-2 p-1 px-1 md:space-y-0 md:space-x-4 justify-between items-center w-full">
                    <div className="flex items-center justify-between w-full md:space-x-8 md:w-auto">
                        <Link to="/">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faVirus} className="text-red-900 md:text-2xl" />
                                <span className="ml-1">Coronavirus(Covid-19)</span>
                            </div>
                        </Link>
                        {pathname === '/' && <select value={sort} onChange={(e) => setSort(e.target.value)} className="select-filter px-2 py-1 shadow rounded-md text-center text-blue-600">
                            <option value=''>Filter</option>
                            <option value="cases">Filter by Cases</option>
                            <option value="active">Filter by Active</option>
                            <option value="todayCases">Filter by Today Cases</option>
                            <option value="todayDeaths">Filter by Today Deaths</option>
                            <option value="deaths">Filter by Deaths</option>
                            <option value="critical">Filter by Critical</option>
                            <option value="recovered">Filter by Recovered</option>
                        </select>}
                    </div>
                    { pathname === '/' && <div className="flex items-center border border-gray-600 md:w-1/2 bg-white p-0.5 rounded-sm shadow-lg w-full">
                        <FontAwesomeIcon icon={faSearchLocation} className="text-blue-600 text-lg" />
                        <input placeholder="Country" onChange={(event) => setCountry(event.target.value.trim()) } value={countryName} className="placeholder-blue-900 placeholder-opacity-50 capitalize w-full focus:outline-none mx-1 text-gray-700" type="text" />
                        <button onClick={() => setCountry('')} className={!countryName ? "hidden" : "focus:outline-none"}><FontAwesomeIcon icon={faTimesCircle} className="text-gray-400 hover:text-red-600 text-lg" /></button>
                    </div>}
                    <div className="flex space-x-6 justify-between items-center md:w-auto px-4 md:px-0 w-full">
                        {isAuthenticated && pathname !== '/' && <NavLink className="px-2 py-1 rounded" to="/mynews">
                            <span className="text-gray-700 mr-0.5" aria-hidden="true" role="img">
                                <FontAwesomeIcon icon={faRss} />
                            </span>
                            My News
                        </NavLink>}
                        {isAuthenticated && pathname !== '/' && <NavLink className="px-2 py-1 rounded" to="/add">
                            <span aria-hidden="true" role="img">
                            ➕
                            </span>
                            Add News
                        </NavLink>}
                        {isAuthenticated && pathname !== '/' && <NavLink className="px-2 py-1 rounded" to="/today">
                            <span aria-hidden="true" role="img">
                            ➕
                            </span>
                            Add Data
                        </NavLink>}
                        <NavLink className="px-2 py-1 rounded" to="/news">News</NavLink>
                        <NavLink className="px-2 py-1 rounded mx-6 md:mx-auto" to="/favorites">Favorites</NavLink>
                        {!isAuthenticated ? (
                            <NavLink className="border border-blue-600 px-6 py-1 rounded hover:bg-gray-200" to="/signin">Login</NavLink>
                        ) : (
                            <div
                                onClick={() => setToggle(!toggle)}
                                className="cursor-pointer relative w-12 flex items-center text-2xl focus:outline-none hover:text-gray-500 space-x-1">
                                {/* <img className="w-10 h-10 object-cover rounded-full" src={userInfo.avatar} alt="avatar" /> */}
                                <FontAwesomeIcon icon={faCaretDown} />
                                {userInfo && <div
                                    onMouseLeave={() => setToggle(false)}
                                    className={`${!toggle ? 'hidden' : 'w-64 flex flex-col items-center space-y-4 absolute top-11 bg-white px-6 py-4 shadow-md rounded-md border border-gray-200 right-0'}`}>
                                    <p className="capitalize text-xl tracking-wide font-light text-blue-800">{userInfo.firstName} {userInfo.lastName}</p>
                                    <button 
                                        onClick={async () => {
                                            await onLogout();
                                            replace('/signin');
                                        }}
                                    className="border border-blue-600 px-8 text-sm py-2 rounded-full hover:bg-gray-200" type="button">Logout</button>
                                </div>}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}

const mapDispatchToProps = (dispatch) => ({
    searchCountry: (country) => dispatch(search(country)),
    filterData: (sort) => dispatch(filter(sort)),
    onLogout: () => dispatch(logout()),
});

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userInfo: JSON.parse(state.auth.userInfo),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
