'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import smallLogo from '@/public/assets/images/small-logo.webp';

interface MenuCategory {
    label: string;
    path: string;
}

const menuCategories: MenuCategory[] = [
    { label: 'VORSPEISE', path: '/menu/vorspeise' },
    { label: 'MITTAGSMENÜ', path: '/menu/mittagsmenue' },
    { label: 'HAUPTSPEISE', path: '/menu/hauptspeise' },
    { label: 'SUSHI', path: '/menu/sushi' },
    { label: 'DESSERT', path: '/menu/dessert' },
    { label: 'DRINKS', path: '/menu/drinks' },
];

const navigationItems = [
    { label: 'Einführen', href: '#about' },
    { label: 'Speisekarte', href: '#menu', hasDropdown: true },
    { label: 'Adresse', href: '#address' },
];

// Hook kiểm tra Client-side mount an toàn cho React 18/19
const emptySubscribe = () => () => {};
function useIsMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    );
}

export default function Navbar() {
    const isMounted = useIsMounted();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(true); // Mac định mở sẵn hoặc toggle tùy thích
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    // 1. Khóa cuộn trang phía sau khi mở Menu Mobile
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isMobileMenuOpen]);

    // 2. Lắng nghe cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = (e?: React.SyntheticEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        closeMobileMenu();

        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.replace('#', '');

            if (pathname === '/') {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                router.push(`/${href}`);
            }
        }
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-[999] transform-gpu transition-all duration-300 ${
                isScrolled || isMobileMenuOpen
                    ? 'bg-black/95 shadow-2xl backdrop-blur-md'
                    : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent'
            }`}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={(e) => handleNavClick(e, '#about')}
                    className="relative z-[1000] flex shrink-0 items-center"
                    aria-label="Kazoku Restaurant"
                >
                    <Image
                        src={smallLogo}
                        alt="Kazoku Restaurant"
                        width={64}
                        height={64}
                        className="h-14 w-14 object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center md:flex">
                    <div className="flex items-center gap-8">
                        {navigationItems.map((item) => (
                            <div
                                key={item.href}
                                className="relative"
                                onMouseEnter={() => {
                                    if (item.hasDropdown)
                                        setIsDesktopMenuOpen(true);
                                }}
                                onMouseLeave={() => {
                                    if (item.hasDropdown)
                                        setIsDesktopMenuOpen(false);
                                }}
                            >
                                <a
                                    href={item.href}
                                    onClick={(e) =>
                                        handleNavClick(e, item.href)
                                    }
                                    className="flex items-center gap-2 py-7 text-[13px] font-medium uppercase tracking-[0.14em] text-white transition duration-300 hover:text-red-400"
                                >
                                    {item.label}
                                    {item.hasDropdown && (
                                        <svg
                                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                                isDesktopMenuOpen
                                                    ? 'rotate-180 text-red-400'
                                                    : ''
                                            }`}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path
                                                d="M5 7.5L10 12.5L15 7.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </a>

                                {/* Desktop Dropdown */}
                                {item.hasDropdown && isDesktopMenuOpen && (
                                    <div className="absolute left-1/2 top-full w-60 -translate-x-1/2 border-t-2 border-red-600 bg-black/95 py-3 shadow-2xl backdrop-blur-xl">
                                        {menuCategories.map((category) => (
                                            <Link
                                                key={category.path}
                                                href={category.path}
                                                onClick={() =>
                                                    setIsDesktopMenuOpen(false)
                                                }
                                                className="block px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white/80 transition duration-200 hover:bg-white/10 hover:text-red-400"
                                            >
                                                {category.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <a
                            href="tel:+4961192777979"
                            className="ml-2 flex items-center gap-2 border border-white/70 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
                        >
                            0611 92777979
                        </a>
                    </div>
                </div>

                {/* Mobile Nút Hamburger */}
                <button
                    type="button"
                    onClick={toggleMobileMenu}
                    onTouchEnd={toggleMobileMenu}
                    aria-label={
                        isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'
                    }
                    aria-expanded={isMobileMenuOpen}
                    className="relative z-[1000] flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg text-white touch-manipulation md:hidden active:bg-white/10 select-none"
                >
                    {isMobileMenuOpen ? (
                        <svg
                            className="h-7 w-7 pointer-events-none"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                d="M6 6L18 18M6 18L18 6"
                                strokeLinecap="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-7 w-7 pointer-events-none"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                d="M4 7H20M4 12H20M4 17H20"
                                strokeLinecap="round"
                            />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Navigation Full Overlay - Sử dụng 100dvh & overflow-y-auto đảm bảo không bao giờ mất menu */}
            {isMounted && isMobileMenuOpen && (
                <div className="fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] z-[998] flex flex-col justify-between overflow-y-auto bg-black/95 px-6 pb-12 pt-4 backdrop-blur-2xl md:hidden">
                    <div className="flex flex-col space-y-1">
                        {navigationItems.map((item) => (
                            <div
                                key={item.href}
                                className="border-b border-white/10 py-1"
                            >
                                {item.hasDropdown ? (
                                    <div>
                                        {/* Tiêu đề có nút toggle Dropdown */}
                                        <div
                                            onClick={() =>
                                                setIsMobileDropdownOpen(
                                                    (prev) => !prev,
                                                )
                                            }
                                            className="flex cursor-pointer items-center justify-between py-3 text-base font-semibold uppercase tracking-[0.14em] text-white active:text-red-400"
                                        >
                                            <a
                                                href={item.href}
                                                onClick={(e) =>
                                                    handleNavClick(e, item.href)
                                                }
                                            >
                                                {item.label}
                                            </a>
                                            <button
                                                type="button"
                                                className="p-2 text-white/80 touch-manipulation"
                                                aria-label="Toggle Submenu"
                                            >
                                                <svg
                                                    className={`h-5 w-5 transition-transform duration-300 ${
                                                        isMobileDropdownOpen
                                                            ? 'rotate-180 text-red-500'
                                                            : ''
                                                    }`}
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        d="M5 7.5L10 12.5L15 7.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Danh sách thả xuống mở rộng (Accordion) */}
                                        {isMobileDropdownOpen && (
                                            <div className="mb-3 space-y-1 rounded-xl bg-white/5 p-3">
                                                {menuCategories.map(
                                                    (category) => (
                                                        <Link
                                                            key={category.path}
                                                            href={category.path}
                                                            onClick={
                                                                closeMobileMenu
                                                            }
                                                            className="flex items-center justify-between rounded-md px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white/90 transition-colors active:bg-red-600 active:text-white"
                                                        >
                                                            <span>
                                                                {category.label}
                                                            </span>
                                                            <span className="text-xs text-white/40">
                                                                ➔
                                                            </span>
                                                        </Link>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        href={item.href}
                                        onClick={(e) =>
                                            handleNavClick(e, item.href)
                                        }
                                        className="block py-4 text-base font-semibold uppercase tracking-[0.14em] text-white active:text-red-400"
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Nút Gọi điện cố định phía dưới cùng của Overlay */}
                    <div className="pt-6">
                        <a
                            href="tel:+4961192777979"
                            onClick={closeMobileMenu}
                            className="flex w-full items-center justify-center gap-3 border-2 border-red-600 bg-red-600/10 px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition active:bg-red-600"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            0611 92777979
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
