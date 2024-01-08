import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Countrysearch.css';
import bgWallpaper from './../../img/bg-wall.jpg';

function Countrysearch() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [emptyInput, setEmptyInput] = useState(false);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(info => setData(info));
    }, []);

    const sortedData = [...data].sort((a, b) => a.name.common.localeCompare(b.name.common));

    const handleSearch = () => {
        if (!searchTerm) {
            setEmptyInput(true);
            setSearchResults([]);
            setNotFound(false);
            return;
        }

        const filteredResults = sortedData.filter(item =>
            item.capital?.[0]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredResults.length > 0) {
            setSearchResults(filteredResults);
            setNotFound(false);
        } else {
            setSearchResults([]);
            setNotFound(true);
        }

        setEmptyInput(false);
    };

    return (
        <div className='container' style={{
            backgroundImage: `url(${bgWallpaper})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
        }}>
            <div className='search'>
                <input
                    type="text"
                    placeholder="Country or Capital Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {emptyInput && <p>Please do not leave this blank.</p>}
            <ul>
                {searchResults.map((item, index) => (
                    <li key={item.ccn3}>
                        <div className='allcountry'>
                            <p>{index + 1}.</p>
                            <Link to={`/${item.ccn3}`}>{item.name.common}</Link>
                        </div>
                    </li>
                ))}
            </ul>
            {notFound && <p>Not Found</p>}
        </div>
    );
}

export default Countrysearch;
