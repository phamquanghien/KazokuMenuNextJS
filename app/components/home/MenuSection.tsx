import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import appetizerData from '@/app/data/appetizer.json';
import dessertData from '@/app/data/dessert.json';
import drinksData from '@/app/data/drinks.json';
import lunchData from '@/app/data/lunchMenu.json';
import mainData from '@/app/data/mainDish.json';
import sushiData from '@/app/data/sushi.json';

interface MenuCategoryGroup {
    Items: Array<unknown>;
}

const menuCategories = [
    {
        id: 'vorspeise',
        title: 'Vorspeisen',
        subtitle: 'Köstliche Vorspeisen für einen perfekten Start',
        icon: '🥢',
        href: '/menu/vorspeise',
        count:
            (appetizerData as unknown as MenuCategoryGroup[])[0]?.Items
                ?.length || 0,
    },
    {
        id: 'mittagsmenue',
        title: 'Mittagsmenü',
        subtitle: 'Frische & schnelle Gerichte für Ihre Mittagspause',
        icon: '🍱',
        href: '/menu/mittagsmenue',
        count:
            (lunchData as unknown as MenuCategoryGroup[])[0]?.Items?.length ||
            0,
    },
    {
        id: 'hauptspeise',
        title: 'Hauptspeisen',
        subtitle: 'Traditionelle vietnamesische & asiatische Spezialitäten',
        icon: '🍜',
        href: '/menu/hauptspeise',
        count:
            (mainData as unknown as MenuCategoryGroup[])[0]?.Items?.length || 0,
    },
    {
        id: 'sushi',
        title: 'Sushi Kreationen',
        subtitle: 'Frischer Fisch und feinste Zutaten, kunstvoll zubereitet',
        icon: '🍣',
        href: '/menu/sushi',
        count:
            (sushiData as unknown as MenuCategoryGroup[])[0]?.Items?.length ||
            0,
    },
    {
        id: 'dessert',
        title: 'Desserts',
        subtitle: 'Süße Versuchungen zum krönenden Abschluss',
        icon: '🍨',
        href: '/menu/dessert',
        count:
            (dessertData as unknown as MenuCategoryGroup[])[0]?.Items?.length ||
            0,
    },
    {
        id: 'drinks',
        title: 'Getränke',
        subtitle: 'Erfrischende Drinks, hausgemachte Limonaden & Weine',
        icon: '🍹',
        href: '/menu/drinks',
        count:
            (drinksData as unknown as MenuCategoryGroup[])[0]?.Items?.length ||
            0,
    },
];

export default function MenuSection() {
    return (
        /* Đổi nền section sang sáng (bg-stone-50 hoặc bg-zinc-100) */
        <section
            id="menu"
            className="relative bg-stone-50 py-20 text-zinc-900 sm:py-28"
        >
            <div className="mx-auto max-w-6xl px-6">
                {/* Heading (Chuyển chữ sang màu tối) */}
                <div className="mb-14 text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">
                        Kazoku Restaurant
                    </span>
                    <h2 className="mt-2 font-serif text-3xl font-light uppercase tracking-wider text-zinc-900 sm:text-5xl">
                        Unsere Speisekarte
                    </h2>
                    <div className="mx-auto mt-4 h-0.5 w-16 bg-amber-500" />
                    <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-600 sm:text-base">
                        Bitte wählen Sie eine Kategorie, um unsere Spezialitäten zu entdecken.
                    </p>
                </div>

                {/* Categories Grid - Giữ nguyên các thẻ Card màu tối (Dark Cards) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {menuCategories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={cat.href}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/10"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-xl transition-transform duration-300 group-hover:scale-110">
                                        {cat.icon}
                                    </span>
                                    <span className="text-xs font-semibold text-amber-500">
                                        {cat.count} Gerichte
                                    </span>
                                </div>

                                <h3 className="mt-6 font-serif text-2xl font-normal tracking-wide text-white transition-colors group-hover:text-amber-400">
                                    {cat.title}
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                                    {cat.subtitle}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 transition-all duration-300 group-hover:translate-x-1.5">
                                <span>Menü ansehen</span>
                                <ArrowRight size={14} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
