import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styling_Pages/Static_Elements/Header_Search_Bar.css';
import api from '../../api';

const HeaderSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (triggerSearch) {
      const timerId = setTimeout(() => {
        if (searchTerm) {
          api.get(`stocks/search-keyword/${searchTerm}`)
            .then(response => {
              setResults(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          setResults([]);
        }
      }, 300);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [searchTerm, triggerSearch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
        setTriggerSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleClick = (symbol) => {
    navigate(`/stock-watchlist/${symbol}`);
    setSearchTerm('');
    setResults([]);
    setTriggerSearch(false);
  };

  return (
    <div className="search-bar" ref={wrapperRef}>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          setTriggerSearch(true);
        }}
        onClick={() => setTriggerSearch(true)}
      />
      {results.length > 0 && (
        <div className="results" onClick={e => e.stopPropagation()}>
          <p> Stocks</p>
          <table>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} onClick={() => handleClick(result.symbol)} className="result-row">
                  <td className="symbol">{result.symbol}</td>
                  <td className="name">{result.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HeaderSearchBar;
