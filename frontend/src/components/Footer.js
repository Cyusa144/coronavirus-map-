import { connect } from 'react-redux';

const Footer = (props) => {
    const { data } = props;
    let active = 0,
        activePerOneMillion = 0,
        casesPerOneMillion = 0,
        cases = 0,
        critical = 0,
        criticalPerOneMillion = 0,
        deaths = 0,
        deathsPerOneMillion = 0,
        recovered = 0,
        recoveredPerOneMillion = 0,
        tests = 0,
        testsPerOneMillion = 0,
        todayCases = 0,
        todayDeaths = 0,
        todayRecovered = 0;

        if(data) {
            data.forEach(el => {
                active += el.active;
                activePerOneMillion += el.activePerOneMillion;
                casesPerOneMillion += el.casesPerOneMillion;
                cases += el.cases;
                critical += el.critical;
                criticalPerOneMillion += el.criticalPerOneMillion;
                deaths += el.deaths;
                deathsPerOneMillion += el.deathsPerOneMillion;
                recovered += el.recovered;
                recoveredPerOneMillion += el.recoveredPerOneMillion;
                tests += el.tests;
                testsPerOneMillion += el.testsPerOneMillion;
                todayCases += el.todayCases;
                todayDeaths += el.todayDeaths;
                todayRecovered += el.todayRecovered
            });
        }
    function numberWithCommas(x) {
        x = Number.isInteger(x) ? x : Number(x).toFixed(3);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
    }

    return (
        <footer className="mt-auto App-footer flex flex-col w-full items-center">
            <div className="max-w-4xl w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 px-1">
                    <h2 className="pb-1 col-span-full text-left text-xl text-gray-200 border-b border-gray-300">Worldwide</h2>
                    <div className="bg-white h-full p-8 border-b-4 border-pink-500 hover:border-gray-50 rounded-lg flex flex-col items-center sm:p-3 md:p-8">
                        <p className="text-gray-800">{numberWithCommas(tests)}</p>
                        <p className="text-gray-600 text-sm">Total tests</p>
                        <p className="mt-4 text-gray-800">{numberWithCommas(testsPerOneMillion)}</p>
                        <p className="text-gray-600 text-sm">Per 1 million</p>
                    </div>
                    <div className="bg-white h-full p-8 border-b-4 border-pink-500 hover:border-gray-50 rounded-lg flex flex-col items-center sm:p-3 md:p-8">
                        <p className="text-gray-800">{numberWithCommas(cases) + "( +" + numberWithCommas(todayCases) + " )"}</p>
                        <p className="text-gray-600 text-sm">Total cases</p>
                        <p className="mt-4 text-gray-800">{numberWithCommas(casesPerOneMillion)}</p>
                        <p className="text-gray-600 text-sm">Per 1 million</p>
                    </div>
                    <div className="bg-white h-full p-8 border-b-4 border-pink-500 hover:border-gray-50 rounded-lg flex flex-col items-center sm:p-3 md:p-8">
                        <p className="text-gray-800">{numberWithCommas(active)}</p>
                        <p className="text-gray-600 text-sm">Total active</p>
                        <p className="mt-4 text-gray-800">{numberWithCommas(activePerOneMillion)}</p>
                        <p className="text-gray-600 text-sm">Per 1 million</p>
                    </div>
                    <div className="bg-white h-full p-8 border-b-4 border-pink-500 hover:border-gray-50 rounded-lg flex flex-col items-center sm:p-3 md:p-8">
                        <p className="text-gray-800">{numberWithCommas(deaths) + "( +" + numberWithCommas(todayDeaths) + " )"}</p>
                        <p className="text-gray-600 text-sm">Total deaths</p>
                        <p className="mt-4 text-gray-800">{numberWithCommas(deathsPerOneMillion)}</p>
                        <p className="text-gray-600 text-sm">Per 1 million</p>
                    </div>
                    <div className="bg-white h-full p-8 border-b-4 border-pink-500 hover:border-gray-50 rounded-lg flex flex-col items-center sm:p-3 md:p-8">
                        <p className="text-gray-800">{numberWithCommas(critical)}</p>
                        <p className="text-gray-600 text-sm">Total critical</p>
                        <p className="mt-4 text-gray-800">{numberWithCommas(criticalPerOneMillion)}</p>
                        <p className="text-gray-600 text-sm">Per 1 million</p>
                    </div>
                    <div className="bg-white h-full p-8 border-b-4 border-pink-500 hover:border-gray-50 rounded-lg flex flex-col items-center sm:p-3 md:p-8">
                        <p className="text-gray-800">{numberWithCommas(recovered) + "( +" + numberWithCommas(todayRecovered) + " )"}</p>
                        <p className="text-gray-600 text-sm">Total recovered</p>
                        <p className="mt-4 text-gray-800">{numberWithCommas(recoveredPerOneMillion)}</p>
                        <p className="text-gray-600 text-sm">Per 1 million</p>
                    </div>
                </div>
                <p className="my-8">Copyright &copy; 2021 Covid-19</p>
            </div>
        </footer>
    )
}

const mapStateToProps = (state) => ({
    data: state.covidData.data
})
export default connect(mapStateToProps, null)(Footer);
