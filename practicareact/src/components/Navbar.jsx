import { useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
    const { isLoggedIn, logoutClick } = useAuth();
    const [open, setOpen] = useState(false);
    const menuItems = [
        { name: 'Iniciar sesión', href: '/login' },
        { name: 'Registro', href: '/registro' },
    ];
    const loggedInMenuItems = [
        { name: 'Dashboard', href: '/' },
        { name: 'Lista de Personas', href: '/personas' },
        { name: 'Crear Persona', href: '/personas/create' },
    ];

    return (
        <nav className="bg-gray-900">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex min-h-14 items-center justify-between">
                    {/* Brand */}
                    <a href="/" className="text-xl font-semibold text-white">
                        Navbar
                    </a>

                    {/* Hamburger */}
                    <button
                        type="button"
                        className="cursor-pointer rounded-md border border-gray-600 px-3 py-2 text-gray-400 hover:text-white lg:hidden"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle navigation"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Desktop menu */}
                    <div className="hidden items-center gap-6 lg:flex">
                        {(isLoggedIn ? loggedInMenuItems : menuItems).map((item) => (
                            <Link to={item.href} className="text-white" key={'menu-' + item.name}>
                                {item.name}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <button
                                className="cursor-pointer text-white"
                                onClick={() => {
                                    logoutClick();
                                }}
                            >
                                Cerrar sesión
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="flex flex-col gap-3 border-t border-gray-700 py-4 lg:hidden">
                        {(isLoggedIn ? loggedInMenuItems : menuItems).map((item) => (
                            <Link
                                to={item.href}
                                className="text-white"
                                key={'menumobile-' + item.name}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <button
                                className="cursor-pointer text-start text-white"
                                onClick={() => {
                                    logoutClick();
                                }}
                            >
                                Cerrar sesión
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
