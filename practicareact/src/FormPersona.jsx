import { useState } from "react";
import FormInput from "./FormInput";

const FormPersona = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault();
        alert(`El nombre escrito es: ${nombre} ${apellido}`);
    }
    return (
        <form onSubmit={onFormSubmit}>
            <FormInput placeholder="Nombre" />
            <input className="border border-solid border-gray-300 active:border-purple-500" type="text" placeholder="Apellido" value={apellido}
                onChange={(e) => setApellido(e.target.value)} />
            <div>El nombre escrito es: {nombre} {apellido}</div>
            <button className="border rounded-full  px-4 py-1 cursor-pointer border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ">Enviar</button>
        </form>
    );
}

export default FormPersona;