import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
    const [countries, setCountries] = useState(null);
    const [countryName, setCountryName] = useState("");

    useEffect(() => {
        const baseURL = "https://studies.cs.helsinki.fi/restcountries/";

        // connect to api
        const fetchAllCountries = async () => {
            // set countries state to all countries from api
            const response = await axios.get(`${baseURL}api/all`);
            setCountries(response.data);
        };

        fetchAllCountries();
    }, [countryName]);

    if (!countries) {
        return null;
    }

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        setCountryName(inputValue);
    };

    // filter countries, if > 10 return 'too many'
    // if <= 10, render the names
    // trebuie sa ne conectam la api/all
    // sa rendam 'too many' daca sunt mai mult de 10 tari care includ input in nume.common
    // daca sunt mai putine, rendam numele tarilor
    // filtram countries cu countryName
    // pastram tarile care includ countryName

    const countriesFiltered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(countryName)
    );

    let content;

    if (countriesFiltered.length > 10) {
        content = "Too many, specify another filter";
    }

    if (countriesFiltered.length > 10 && countryName === "") {
        content = "Enter smth";
    }

    if (countriesFiltered.length <= 10 && countriesFiltered.length > 1) {
        content = countriesFiltered.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
        ));
    }

    if (countriesFiltered.length === 1) {
        const singleCountry = countriesFiltered[0];
        content = (
            <>
                <h3>{singleCountry.name.common}</h3>
                <p>capital {singleCountry.capital}</p>
                <p>area {singleCountry.area}</p>

                <strong>languages:</strong>

                {Object.entries(singleCountry.languages).map(([key, value]) => (
                    <div key={key}>{value}</div>
                ))}

                <img src={singleCountry.flags.png} />
            </>
        );
        console.log(countriesFiltered);
    }

    return (
        <>
            <div className="search-country">
                find countries:{" "}
                <input
                    type="text"
                    value={countryName}
                    onChange={handleSearch}
                />
            </div>

            <div className="render-countries">
                {/* Render countries name that includes countryName */}
                {content}
            </div>
        </>
    );
}

export default App;
