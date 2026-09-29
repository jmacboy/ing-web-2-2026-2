const Button = ({ text, ...props }) => {
    return (
        <button className="border rounded-full  px-4 py-1 cursor-pointer border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 " {...props}>{text}</button>
    );
}

export default Button;