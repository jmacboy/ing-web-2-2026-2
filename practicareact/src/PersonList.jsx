import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import { Link } from 'react-router';
import moment from 'moment';
import { deletePerson, getPersonaList } from './services/PersonService';

const PersonList = () => {
    const [personList, setPersonList] = useState([]);
    const loadPersonList = () => {
        getPersonaList().then((people) => {
            setPersonList(people);
        });
    };
    useEffect(() => {
        loadPersonList();
    }, []);
    const deletePersona = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta persona?');
        if (!confirmDelete) {
            return;
        }
        await deletePerson(id);
        loadPersonList();
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card">
                    <h2 className="card-title">Lista de Personas</h2>
                    <div>
                        <SearchBar />
                    </div>
                    <div className="mt-2">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Edad</th>
                                    <th>Ciudad</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {personList.map((persona) => (
                                    <tr key={persona.id}>
                                        <td>{persona.nombre}</td>
                                        <td>{persona.apellido}</td>
                                        <td>{persona.edad}</td>
                                        <td>{persona.ciudad}</td>
                                        <td>
                                            {moment(persona.fechaNacimiento).format('DD/MM/YYYY')}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/personas/${persona.id}`}
                                                className="cursor-pointer rounded-full bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
                                            >
                                                Editar
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    deletePersona(persona.id);
                                                }}
                                                className="cursor-pointer rounded-full bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonList;
