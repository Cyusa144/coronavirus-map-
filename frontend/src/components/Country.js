import { connect } from 'react-redux';
import { setCountry } from '../store/actions/country';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones, faUserCheck, faBed, faProcedures, faVial, faMale, faVirus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';
import axios from 'axios';

const Country = (props) => {
    const { data, setData, todaysData } = props;
    let active = 0,
        country = '',
        cases = 0,
        critical = 0,
        deaths = 0,
        recovered = 0,
        tests = 0,
        todayCases = 0,
        todayDeaths = 0,
        todayRecovered = 0,
        countryInfo = {
            flag: ''
        };
    useEffect(()=>{
        console.log(todaysData);
    }, [country])
    if(data) {
        if(todaysData) {
            country = data.country;
            countryInfo = data.countryInfo;
            active = data.active;
            cases = data.cases;
            critical = data.critical;
            deaths = data.deaths;
            recovered = data.recovered;
            tests = data.tests;
            todayCases = todaysData.todaysCases;
            todayDeaths = todaysData.todaysDeaths;
            todayRecovered = todaysData.todaysRecovery
        }else {
            country = data.country;
            countryInfo = data.countryInfo;
            active = data.active;
            cases = data.cases;
            critical = data.critical;
            deaths = data.deaths;
            recovered = data.recovered;
            tests = data.tests;
            todayCases = data.todayCases;
            todayDeaths = data.todayDeaths;
            todayRecovered = data.todayRecovered
        }
    }
    
    function numberWithCommas(x) {
        x = Number.isInteger(x) ? x : Number(x).toFixed(3);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
    }
    return (
        <div className={data === null ? "hidden" : "country my-4 rounded-sm shadow-md flex absolute z-20 bg-gray-300 w-11/12 sm:w-1/2 md:w-2/5 flex-col items-start"}>
            <div className="px-2 py-4 w-full">
                <button onClick={() => setData(null)} className="absolute right-2 top-2"><FontAwesomeIcon icon={faTimes} className="text-gray-600 hover:text-gray-800 focus:outline-none text-2xl" /></button>
                <div className="flex items-end">
                    <img className="w-1/4 h-1/4 object-cover" src={countryInfo.flag} alt="flag" />
                    <h1 className="ml-2 text-xl text-left mt-2 text-gray-800 pb-1 border-b border-gray-600">{country}</h1>
                </div>
                <div className="flex items-center justify-between py-2 mt-2">
                    <div className="flex items-center w-1/2">
                        <div className="flex w-1/6">
                            <FontAwesomeIcon icon={faMale} className="text-gray-600 text-4xl" />
                            <FontAwesomeIcon icon={faVirus} className="text-sm text-red-800" />
                        </div>
                        <p className="ml-2 text-sm">Total cases</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(cases) + "( +" + numberWithCommas(todayCases) + " )"}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center w-1/2">
                        <div className="flex w-1/6">
                            <FontAwesomeIcon icon={faBed} className="text-gray-600 text-2xl" />
                        </div>
                        <p className="ml-2 text-sm">Total active</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(active)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center w-1/2">
                        <div className="flex w-1/6">
                            <FontAwesomeIcon icon={faProcedures} className="text-gray-600 text-2xl" />
                        </div>
                        <p className="ml-2 text-sm">Total critical</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(critical)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center w-1/2">
                        <div className="flex w-1/6">
                            <FontAwesomeIcon icon={faVial} className="text-gray-600 text-3xl" />
                        </div>
                        <p className="ml-2 text-sm">Total tests</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(tests)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center w-1/2">
                        <div className="flex w-1/6">
                            <FontAwesomeIcon icon={faUserCheck} className="text-gray-600 text-2xl" />
                        </div>
                        <p className="ml-2 text-sm">Total recovered</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(recovered) + "( +" + numberWithCommas(todayRecovered) + " )"}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center w-1/2">
                        <div className="flex w-1/6">
                            <FontAwesomeIcon icon={faSkullCrossbones} className="text-gray-600 text-3xl" />
                        </div>
                        <p className="ml-2 text-sm">Total deaths</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(deaths) + "( +" + numberWithCommas(todayDeaths) + " )"}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.country.data
})

const mapDispatchToProps = (dispatch) => ({
    setData: (data) => dispatch(setCountry(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);