import { useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
    const { isLoggedIn, logoutClick } = useAuth();
    const [open, setOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const menuItems = [
        { name: 'Iniciar sesión', href: '/login' },
        { name: 'Registro', href: '/register' },
    ];
    const loggedInMenuItems = [
        { name: 'Dashboard', href: '/' },
        {
            name: 'Personas',
            children: [
                { name: 'Lista de Personas', href: '/personas' },
                { name: 'Crear Persona', href: '/personas/create' },
            ],
        },
        {
            name: 'Productos',
            children: [
                { name: 'Lista de Categorías', href: '/categorias' },
                { name: 'Crear Categoría', href: '/categorias/create' },
                { name: 'Lista de Productos', href: '/productos' },
                { name: 'Crear Producto', href: '/productos/create' },
            ],
        },
    ];

    return (
        <nav className="relative z-50 bg-gray-900">
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
                        onClick={() => {
                            if (open) setOpenSubmenu(null);
                            setOpen(!open);
                        }}
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
                        {(isLoggedIn ? loggedInMenuItems : menuItems).map((item) =>
                            item.children ? (
                                <div className="relative" key={'menu-' + item.name}>
                                    <button
                                        type="button"
                                        className="flex cursor-pointer items-center gap-1 text-white"
                                        onClick={() =>
                                            setOpenSubmenu(
                                                openSubmenu === item.name ? null : item.name,
                                            )
                                        }
                                        aria-expanded={openSubmenu === item.name}
                                        aria-haspopup="true"
                                    >
                                        {item.name}
                                        <svg
                                            className={`h-4 w-4 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    {openSubmenu === item.name && (
                                        <div className="absolute left-0 top-full mt-2 min-w-48 rounded-b-md border border-gray-700 bg-gray-800 py-2 shadow-lg">
                                            {item.children.map((child) => (
                                                <Link
                                                    to={child.href}
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                                    key={'submenu-' + child.name}
                                                    onClick={() => setOpenSubmenu(null)}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to={item.href} className="text-white" key={'menu-' + item.name}>
                                    {item.name}
                                </Link>
                            ),
                        )}
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
                        {(isLoggedIn ? loggedInMenuItems : menuItems).map((item) =>
                            item.children ? (
                                <div
                                    className="flex flex-col gap-2"
                                    key={'menumobile-' + item.name}
                                >
                                    <button
                                        type="button"
                                        className="flex cursor-pointer items-center justify-between text-white"
                                        onClick={() =>
                                            setOpenSubmenu(
                                                openSubmenu === item.name ? null : item.name,
                                            )
                                        }
                                        aria-expanded={openSubmenu === item.name}
                                        aria-haspopup="true"
                                    >
                                        {item.name}
                                        <svg
                                            className={`h-4 w-4 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    {openSubmenu === item.name && (
                                        <div className="flex flex-col gap-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    to={child.href}
                                                    className="pl-4 text-white"
                                                    key={'menumobile-' + child.name}
                                                    onClick={() => {
                                                        setOpenSubmenu(null);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to={item.href}
                                    className="text-white"
                                    key={'menumobile-' + item.name}
                                >
                                    {item.name}
                                </Link>
                            ),
                        )}
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
