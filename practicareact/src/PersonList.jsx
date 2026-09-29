import axios from 'axios';
import { useEffect, useState } from 'react';

const PersonList = () => {
    const [personList, setPersonList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/personas').then((response) => {
            console.log(response.data);
            setPersonList(response.data);
        });
    }, []);
    return (
        <div className="container">
            <div className="card">
                <h2 className="card-title">Lista de Personas</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Ciudad</th>
                            <th>Fecha de Nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personList.map((persona) => (
                            <tr key={persona.id}>
                                <td>{persona.nombre}</td>
                                <td>{persona.apellido}</td>
                                <td>{persona.edad}</td>
                                <td>{persona.ciudad}</td>
                                <td>{persona.fechaNacimiento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonList;
