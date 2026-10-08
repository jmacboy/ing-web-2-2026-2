import { useEffect, useState } from 'react';
import { searchPerson } from '../services/PersonService';
import { useNavigate } from 'react-router';

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [resultList, setResultList] = useState([]);
    useEffect(() => {
        const getSearchResults = async () => {
            if (searchText.length <= 2) {
                setResultList([]);
                return;
            }
            searchPerson(searchText).then((results) => {
                setResultList(results);
            });
        };
        getSearchResults();
    }, [searchText]);
    return (
        <div className="search-bar">
            <input
                className="search-input active:border-purple-50block disabled:bg-gray-1000 w-full rounded-md border border-solid border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm transition outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed"
                type="text"
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <div className={'search-results ' + (resultList.length > 0 ? 'block' : 'hidden')}>
                {resultList.map((persona) => (
                    <div
                        onClick={() => {
                            navigate(`/personas/${persona.id}`);
                        }}
                        key={persona.id}
                        className="search-result-item"
                    >
                        {persona.nombre} {persona.apellido}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
