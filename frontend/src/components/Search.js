const Search = (props) => {
    const { dataCountry } = props;
    
    return (<li onClick={() => props.clicked(dataCountry)} className="flex w-full px-4 py-2 my-2 rounded-md border bg-gray-400 cursor-pointer border-indigo-300 items-center justify-between">
        <img className="w-24 h-12 object-cover " src={dataCountry.countryInfo.flag} alt="flag" />
        <p className="ml-4 sm:space-y-24 md:ml-48 text-sm text-gray-800">{dataCountry.country}</p>
    </li>)
}

export default Search;