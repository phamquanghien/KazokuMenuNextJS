import Link from 'next/link';
import Image from 'next/image';

// Đường dẫn ảnh dùng alias @/
import backgroundImage from '@/public/assets/images/background.webp';
import logo from '@/public/assets/images/logo.webp';

export default function HeroSection() {
    return (
        <section
            id="about"
            className="relative min-h-screen overflow-hidden bg-zinc-950 font-sans"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                style={{
                    backgroundImage: `url(${backgroundImage.src})`,
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

            {/* Content Container */}
            <div className="relative z-10 flex min-h-screen items-center">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16">
                    {/* Left Column (Content) */}
                    <div className="text-white lg:col-span-7">
                        {/* Title */}
                        <h1 className="mt-6 text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl leading-[1.15]">
                            Willkommen im <br />
                            <span className="font-serif italic font-normal text-amber-200">
                                KAZOKU
                            </span>{' '}
                            Restaurant
                        </h1>

                        <p className="mt-3 text-sm uppercase tracking-[0.35em] text-zinc-400 sm:text-base">
                            FOOD AND MORE
                        </p>

                        {/* Opening Hours Card */}
                        <div className="mt-8 w-full max-w-lg rounded-2xl border border-white/15 bg-black/60 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            {/* Viền sáng nhẹ */}
                            <div className="absolute -top-12 -left-12 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all duration-500" />

                            <div className="flex items-center gap-2.5 text-amber-400 border-b border-white/10 pb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.8}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                                    />
                                </svg>
                                <h2 className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-amber-400">
                                    Öffnungszeiten
                                </h2>
                            </div>

                            {/* Khung giờ mở cửa */}
                            <div className="mt-5 space-y-4">
                                {/* Ngày thường */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/10 pb-3.5">
                                    <span className="text-base sm:text-lg font-semibold text-white">
                                        Mo., Mi., Do., Fr.
                                    </span>
                                    <div className="text-base sm:text-lg font-semibold text-amber-300 tracking-wide text-left sm:text-right">
                                        <div>11:30 - 14:30</div>
                                        <div>17:00 - 22:00</div>
                                    </div>
                                </div>

                                {/* Cuối tuần & Lễ */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/10 pb-3.5">
                                    <span className="text-base sm:text-lg font-semibold text-white">
                                        Sa., So., Feiertagen
                                    </span>
                                    <span className="text-base sm:text-lg font-semibold text-amber-300 tracking-wide">
                                        12:00 - 22:30
                                    </span>
                                </div>

                                {/* Ngày nghỉ */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
                                    <span className="text-base sm:text-lg font-semibold text-rose-400">
                                        Dienstag ist Ruhetag außer Feiertagen
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                href="/menu"
                                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg bg-amber-500 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                            >
                                <span>Speisekarte</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (Logo) */}
                    <div className="relative flex items-center justify-center lg:col-span-5 lg:justify-end">
                        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

                        <Image
                            src={logo}
                            alt="Kazoku Restaurant"
                            priority
                            className="relative z-10 w-64 max-w-[75vw] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105 sm:w-80 md:w-96 lg:w-[28rem]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
