import { form } from '@fortawesome/free-brands-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
const CovidDataForm = props=>{
    const [values, setValues] = useState({
        tests: '',
        cases: '',
        recovery: '',
        deaths: '',
        country: ''
    })
    const [countries, setCountries] = useState('');
    const { push } = useHistory();
    const handleChange = event =>{
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = e=>{
        e.preventDefault();
        axios
        .post('http://localhost:4000/api/todayTest', values)
        .then(response => {
            alert('Data recorded')
          push('/mynews');
        })
        
    }
    
    useEffect(()=>{
        axios.get('http://localhost:4000/api/country').then(res=>{
            setCountries(res.data);
        })
    })
    return (
        <div className="flex flex-col space-y-2 px-4 items-center my-8 bg-gray-200 rounded-sm shadow-sm py-8 max-w-4xl mx-auto w-full">
             <form
          className="space-y-6 w-full"
          onSubmit = {handleSubmit}
        >
            <div className="flex space-y-1 flex-col items-start w-full">
                <label>Number of tests</label>
                <input
                     required
                     name="tests"
                     onChange= {handleChange}
                     value = {values.tests}
                     className="py-2 px-1 rounded-sm focus:outline-none w-full" 
                     type="text"
                     placeholder="Enter today's taken tests number"
                />

            </div>
            <div className="flex space-y-1 flex-col items-start w-full">
                <label>Positive tests</label>
                <input
                     required
                     name="cases"
                     onChange= {handleChange}
                     value = {values.cases}
                     className="py-2 px-1 rounded-sm focus:outline-none w-full" 
                     type="text"
                     placeholder="Enter today's positive tests number"
                />

            </div>
            <div className="flex space-y-1 flex-col items-start w-full">
                <label>Recovered</label>
                <input
                     required
                     name="recovery"
                     onChange= {handleChange}
                     value = {values.recovery}
                     className="py-2 px-1 rounded-sm focus:outline-none w-full" 
                     type="text"
                     placeholder="Enter today's recovered patients number"
                />

            </div>
            <div className="flex space-y-1 flex-col items-start w-full">
                <label>Deaths</label>
                <input
                     required
                     name="deaths"
                     onChange= {handleChange}
                     value = {values.deaths}
                     className="py-2 px-1 rounded-sm focus:outline-none w-full" 
                     type="text"
                     placeholder="Enter today's deaths number"
                />

            </div>
            <div className="flex space-y-1 flex-col items-start w-full">
                <label>Select a country</label>
                <select className="py-2 px-1 rounded-sm focus:outline-none w-full" name="country" onChange={handleChange}>
                    <option value='0'></option>
                    {countries && countries.map(country => (
                        <option value={country.id} key={country.id}>{country.name}</option>
                    ))}

                </select>
            </div>
            <button className="bg-blue-600 px-16 rounded text-gray-200 font-medium text-xl tracking-wide hover:opacity-75 py-4" type="submit">Save</button>
        </form>
        </div>
       
    );
}


export default CovidDataForm;