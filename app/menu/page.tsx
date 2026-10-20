import Link from 'next/link';
import { ArrowRight, ChevronRight, Utensils } from 'lucide-react';

// Import dữ liệu JSON
import mittagsangebot from '@/app/data/mittagsangebot.json';
import vorspeise from '@/app/data/vorspeise.json';
import kindermenu from '@/app/data/kindermenu.json';
import hauptspeise from '@/app/data/hauptspeise.json';
import sushi from '@/app/data/sushi.json';
import vegetarisch from '@/app/data/vegetarisch.json';
import dessert from '@/app/data/dessert.json';
import getranke from '@/app/data/getranke.json';

interface MenuCategoryGroup {
    Category?: string | null;
    Items: Array<unknown>;
}

const menuCategories = [
    {
        id: 'mittagsangebot',
        title: 'Mittagsangebot',
        subtitle: 'Frische & schnelle Gerichte für ihre Mittagspause',
        timeInfo: 'Montag -Freitag / 11:30 Uhr - 14:30 Uhr',
        note: 'Außer Feiertagen',
        icon: '🍱',
        href: '/menu/mittagsangebot',
        count:
            (mittagsangebot as unknown as MenuCategoryGroup[])[0]?.Items
                ?.length || 0,
    },
    {
        id: 'vorspeise',
        title: 'Vorspeise',
        subtitle: 'Köstlichen kleinen Speisen für einen perfekten Start',
        note: 'Vorspeisen, Tatar/Tataki, Suppe, Salat',
        icon: '🥟',
        href: '/menu/vorspeise',
        count:
            (vorspeise as unknown as MenuCategoryGroup[])[0]?.Items?.length ||
            0,
    },
    {
        id: 'kindermenu',
        title: 'Kindermenü',
        subtitle: 'Speisen für unseren kleinen Gäste',
        icon: '👶',
        href: '/menu/kindermenu',
        count:
            (kindermenu as unknown as MenuCategoryGroup[])[0]?.Items?.length ||
            0,
    },
    {
        id: 'hauptspeise',
        title: 'Hauptspeise',
        subtitle: 'Authentische asiatische Spezialität',
        icon: '🍛',
        href: '/menu/hauptspeise',
        count:
            (hauptspeise as unknown as MenuCategoryGroup[])[0]?.Items?.length ||
            0,
    },
    {
        id: 'sushi',
        title: 'Sushi',
        subtitle: 'Frischer Fisch und feinste Zutaten',
        note: 'Wir verwenden ausschließlich exquisiten "Label Rouge" Lachs- schottisch mit Gütezeichen- eine der höchsten Qualitätsstufen auf dem Markt',
        icon: '🍣',
        href: '/menu/sushi',
        count: (sushi as unknown as MenuCategoryGroup[])[0]?.Items?.length || 0,
    },
    {
        id: 'vegetarisch',
        title: 'Vegetarisch',
        icon: '🌱',
        href: '/menu/vegetarisch',
        count:
            (vegetarisch as unknown as MenuCategoryGroup[])[0]?.Items?.length ||
            0,
    },
    {
        id: 'dessert',
        title: 'Dessert',
        icon: '🍨',
        href: '/menu/dessert',
        count:
            (dessert as unknown as MenuCategoryGroup[])[0]?.Items?.length || 0,
    },
    {
        id: 'getranke',
        title: 'Getränke',
        icon: '🍹',
        href: '/menu/getranke',
        count:
            (getranke as unknown as MenuCategoryGroup[])[0]?.Items?.length || 0,
    },
];

export default function MenuOverviewPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Header Banner */}
            <header className="relative border-b border-zinc-800 bg-zinc-900/50 py-16 sm:py-24">
                <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[128px]" />

                <div className="relative mx-auto max-w-5xl px-6 text-center">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-zinc-400">
                        <Link
                            href="/"
                            className="transition hover:text-amber-500"
                        >
                            Home
                        </Link>
                        <ChevronRight size={12} />
                        <span className="font-medium text-amber-500">
                            Speisekarte
                        </span>
                    </nav>

                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
                        Kazoku Restaurant
                    </span>
                    <h1 className="mt-3 font-serif text-3xl font-light uppercase tracking-wider text-white sm:text-5xl">
                        Unsere Speisekarte
                    </h1>
                    <div className="mx-auto mt-4 h-0.5 w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                    <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
                        Wählen Sie eine Kategorie, um unsere Spezialitäten im
                        Detail zu entdecken.
                    </p>
                </div>
            </header>

            {/* Grid 6 Danh mục */}
            <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {menuCategories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={cat.href}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-amber-500/5"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800/80 text-2xl border border-zinc-700/50 transition-transform duration-300 group-hover:scale-110">
                                        {cat.icon}
                                    </span>
                                    <span className="text-xs font-semibold text-zinc-500 group-hover:text-amber-500">
                                        {cat.count} Gerichte
                                    </span>
                                </div>

                                <h2 className="mt-6 font-serif text-2xl font-normal tracking-wide text-zinc-100 group-hover:text-amber-400">
                                    {cat.title}
                                </h2>
                                <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                                    {cat.subtitle}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 transition-all duration-300 group-hover:translate-x-1">
                                <span>Menü ansehen</span>
                                <ArrowRight size={14} />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
