import { MapPin, Navigation, Phone, Clock } from 'lucide-react';

const address = {
    name: 'KAZOKU Restaurant',
    tagline: 'FOOD AND MORE',
    street: 'Dotzheimer Str. 30',
    city: '65185 Wiesbaden',
    phone: '0611 92777979',
};

const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=KAZOKU+Restaurant%2C+Dotzheimer+Str.+30%2C+65185+Wiesbaden%2C+Germany';

const googleMapsEmbedUrl =
    'https://www.google.com/maps?q=KAZOKU+Restaurant,+Dotzheimer+Str.+30,+65185+Wiesbaden,+Germany&output=embed';

export default function AddressSection() {
    return (
        <section
            id="address"
            className="relative overflow-hidden bg-zinc-950 py-20 text-white sm:py-28 lg:py-32"
        >
            {/* Background Accent Glow */}
            <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[128px]" />

            <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                {/* Heading Section */}
                <div className="mb-16 max-w-2xl">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500/90">
                        {address.name}
                    </span>
                    <h2 className="mt-3 text-3xl font-light uppercase tracking-[0.18em] text-zinc-100 sm:text-5xl">
                        Besuchen Sie uns
                    </h2>
                    <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Left Column: Info Cards */}
                    <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
                        {/* Sub Header */}
                        <div>
                            <h3 className="text-2xl font-normal tracking-wide text-zinc-100 sm:text-3xl">
                                {address.name}
                            </h3>
                            <p className="mt-1 text-xs font-medium uppercase tracking-[0.3em] text-amber-500/80">
                                {address.tagline}
                            </p>
                        </div>

                        {/* Details Stack */}
                        <div className="space-y-6">
                            {/* Address Card */}
                            <div className="group flex items-start gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80">
                                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-black">
                                    <MapPin size={20} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                                        Adresse
                                    </h4>
                                    <p className="mt-1 text-sm leading-relaxed text-zinc-200 sm:text-base">
                                        {address.street}
                                        <br />
                                        {address.city}
                                    </p>
                                </div>
                            </div>

                            {/* Opening Hours Card */}
                            <div className="group flex items-start gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80">
                                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-black">
                                    <Clock size={20} strokeWidth={1.5} />
                                </div>
                                <div className="w-full">
                                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                                        Öffnungszeiten
                                    </h4>
                                    <div className="mt-2 space-y-2 text-sm text-zinc-300 sm:text-base">
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="text-zinc-400">
                                                Mo., Mi., Do., Fr.:
                                            </span>
                                            <span className="font-medium">
                                                11:30 - 14:30 | 17:00 - 22:00
                                            </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="text-zinc-400">
                                                Sa., So., Feiertage:
                                            </span>
                                            <span className="font-medium">
                                                12:00 - 22:30
                                            </span>
                                        </div>
                                        <div className="border-t border-zinc-800/60 pt-2 text-xs">
                                            <span className="font-medium text-amber-400">
                                                Dienstag ist Ruhetag
                                            </span>
                                            <span className="ml-1 text-zinc-500">
                                                (außer Feiertagen)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Card */}
                            <div className="group flex items-start gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80">
                                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-black">
                                    <Phone size={20} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                                        Telefon
                                    </h4>
                                    <a
                                        href={`tel:${address.phone.replace(/\s/g, '')}`}
                                        className="mt-1 inline-block text-sm font-medium text-zinc-200 transition-colors hover:text-amber-400 sm:text-base"
                                    >
                                        {address.phone}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Route Button */}
                        <div className="pt-2">
                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-amber-500 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-lg shadow-amber-500/10 transition-all duration-300 hover:bg-amber-400 hover:shadow-amber-500/20 active:scale-[0.98]"
                            >
                                <Navigation
                                    size={16}
                                    strokeWidth={2}
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                                Route planen
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Embedded Map */}
                    <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl lg:col-span-7">
                        <iframe
                            title="KAZOKU Restaurant auf Google Maps"
                            src={googleMapsEmbedUrl}
                            className="h-full min-h-[420px] w-full border-0"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
