const FormInput = ({ value, labelText, errorText, id, ...props }) => {
    return (
        <div>
            <label htmlFor={id}>{labelText}</label>
            <input
                value={value}
                id={id}
                className="active:border-purple-50block disabled:bg-gray-1000 w-full rounded-md border border-solid border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm transition outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed"
                {...props}
            />
            <div className="error">
                {errorText && <span className="text-red-500">{errorText}</span>}
            </div>
        </div>
    );
};

export default FormInput;
