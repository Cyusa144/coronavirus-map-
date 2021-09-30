import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { useState } from 'react';
import { filter } from '../store/actions';
import SkeletonUI from './Skeleton';

function numberWithCommas(x) {
    x = Number.isInteger(x) ? x : Number(x).toFixed(3);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
}

const FilterCountries = (props) => {
  const { data, sortKey, resetFilter, loading } = props;
  const [page, setPage] = useState({
    start: 0,
    end: 10
  });
  let travels = null;

  if (data) {
    travels = data.slice(page.start, page.end).map((element) => (
      <tr key={element.id} className="hover:bg-gray-300">
        <td className="tdata">{element.id+1}</td>
        <td className="tdata">{element.country}</td>
        <td className={`tdata ${!['cases', 'todayCases'].includes(sortKey) ? '' : sortKey }`}>{numberWithCommas(element.cases) + "( +" + numberWithCommas(element.todayCases) + " )"}</td>
        <td className={`tdata ${sortKey !== 'active' ? '' : sortKey }`}>{numberWithCommas(element.active)}</td>
        <td className={`tdata ${sortKey !== 'critical' ? '' : sortKey }`}>{numberWithCommas(element.critical)}</td>
        <td className={`tdata ${sortKey !== 'recovered' ? '' : sortKey }`}>{numberWithCommas(element.recovered) + "( +" + numberWithCommas(element.todayRecovered) + " )"}</td>
        <td className={`tdata ${!['deaths', 'todayDeaths'].includes(sortKey) ? '' : sortKey }`}>{numberWithCommas(element.deaths) + "( +" + numberWithCommas(element.todayDeaths) + " )"}</td>
        <td className="tdata">{numberWithCommas(element.tests)}</td>
      </tr>
    ));
  }

  if (sortKey && loading) travels = (<SkeletonUI />);

  return sortKey && (
    <div className="country my-4 rounded shadow-md flex absolute z-10 bg-gray-300 w-full md:w-11/12 flex-col items-start py-1">
      <div className="px-2 py-4 w-full">
        <div className="flex items-center absolute right-2 top-2">
          <button onClick={() => {
            setPage({ start: page.start - 10, end: page.end - 10 });
            }} className={page.start <= 0 ? "hidden" : "focus:outline-none bg-blue-500 hover:bg-blue-600 text-gray-100 px-4 py-1 rounded-md"}>Previous</button>
          <button onClick={() => {
            setPage({ start: page.start + 10, end: page.end + 10 });
            }} className={data.length <= page.end ? "hidden" : "focus:outline-none bg-green-500 hover:bg-green-600 text-gray-100 px-4 py-1 ml-8 rounded-md"}>Next</button>
          <button onClick={() => {
            resetFilter('');
            setPage({ start: 0, end: 10 });
          }} className="ml-12"><FontAwesomeIcon icon={faTimes} className="text-gray-600 hover:text-red-800 focus:outline-none text-2xl" /></button>
        </div>
        <div className="table-wrapper mt-6 shadow bg-white text-gray-600 w-full">
          <table className="table-auto w-full text-left border-collapse">
            <caption className="uppercase my-2">COVID-19 Coronavirus Pandemic</caption>
            <thead>
              <tr className="shadow-md">
                <th scope="col">N<sup className="underline">o</sup></th>
                <th scope="col">Country</th>
                <th scope="col">Total cases</th>
                <th scope="col">Active cases</th>
                <th scope="col">Serious criticals</th>
                <th scope="col">Total recovered</th>
                <th scope="col">Total deaths</th>
                <th scope="col">Total tests</th>
              </tr>
            </thead>
            <tbody className="align-baseline">{travels}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.covidData.data,
  loading: state.covidData.loading,
  sortKey: state.covidData.sort
});

const mapDispatchToProps = (dispatch) => ({
    resetFilter: (key) => dispatch(filter(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCountries);