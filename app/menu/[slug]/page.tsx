import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, Info, Utensils } from 'lucide-react';

// Import dữ liệu JSON
import appetizerData from '@/app/data/appetizer.json';
import dessertData from '@/app/data/dessert.json';
import drinksData from '@/app/data/drinks.json';
import lunchData from '@/app/data/lunchMenu.json';
import mainData from '@/app/data/mainDish.json';
import sushiData from '@/app/data/sushi.json';

// Types
interface OptionItem {
    Label: string;
    Note?: string | null;
    Price?: string | null;
}

interface MenuItem {
    Title: string;
    Note?: string | null;
    Description?: string | null;
    Price?: string | null;
    Icon?: string | null;
    Options?: OptionItem[] | null;
}

interface MenuCategoryGroup {
    Category?: string | null;
    Note?: string | null;
    Description?: string | null;
    Price?: string | null;
    Icon?: string | null;
    Items: MenuItem[];
}

interface CategoryConfig {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    data: MenuCategoryGroup[];
}

// Cấu hình các danh mục menu
const categoriesMap: Record<string, CategoryConfig> = {
    vorspeise: {
        id: 'vorspeise',
        title: 'Vorspeisen',
        subtitle: 'Köstliche Vorspeisen für einen perfekten Start',
        icon: '🥢',
        data: appetizerData as unknown as MenuCategoryGroup[],
    },
    mittagsmenue: {
        id: 'mittagsmenue',
        title: 'Mittagsmenü',
        subtitle: 'Frische & schnelle Gerichte für Ihre Mittagspause',
        icon: '🍱',
        data: lunchData as unknown as MenuCategoryGroup[],
    },
    hauptspeise: {
        id: 'hauptspeise',
        title: 'Hauptspeisen',
        subtitle: 'Traditionelle vietnamesische & asiatische Spezialitäten',
        icon: '🍜',
        data: mainData as unknown as MenuCategoryGroup[],
    },
    sushi: {
        id: 'sushi',
        title: 'Sushi Kreationen',
        subtitle: 'Frischer Fisch und feinste Zutaten, kunstvoll zubereitet',
        icon: '🍣',
        data: sushiData as unknown as MenuCategoryGroup[],
    },
    dessert: {
        id: 'dessert',
        title: 'Desserts',
        subtitle: 'Süße Versuchungen zum krönenden Abschluss',
        icon: '🍨',
        data: dessertData as unknown as MenuCategoryGroup[],
    },
    drinks: {
        id: 'drinks',
        title: 'Getränke',
        subtitle: 'Erfrischende Drinks, hausgemachte Limonaden & Weine',
        icon: '🍹',
        data: drinksData as unknown as MenuCategoryGroup[],
    },
};

export async function generateStaticParams() {
    return Object.keys(categoriesMap).map((slug) => ({ slug }));
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const category = categoriesMap[slug];

    if (!category) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Header Banner */}
            <header className="relative border-b border-zinc-800 bg-zinc-900/50 py-16 sm:py-24">
                <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px]" />

                <div className="relative mx-auto max-w-5xl px-6">
                    {/* Navigation Breadcrumb */}
                    <nav className="mb-8 flex items-center gap-2 text-xs text-zinc-400">
                        <Link
                            href="/"
                            className="transition hover:text-amber-500"
                        >
                            Home
                        </Link>
                        <ChevronRight size={12} />
                        <Link
                            href="/#menu"
                            className="transition hover:text-amber-500"
                        >
                            Speisekarte
                        </Link>
                        <ChevronRight size={12} />
                        <span className="font-medium text-amber-500">
                            {category.title}
                        </span>
                    </nav>

                    <div className="flex items-center gap-4">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800/80 text-3xl shadow-inner border border-zinc-700/50">
                            {category.icon}
                        </span>
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">
                                Kazoku Restaurant
                            </span>
                            <h1 className="mt-1 font-serif text-3xl font-light uppercase tracking-wider text-white sm:text-5xl">
                                {category.title}
                            </h1>
                        </div>
                    </div>
                    <p className="mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
                        {category.subtitle}
                    </p>

                    {/* Quick navigation back */}
                    <div className="mt-8">
                        <Link
                            href="/#menu"
                            className="inline-flex items-center gap-2 rounded-lg bg-zinc-800/60 px-4 py-2 text-xs font-medium text-zinc-300 border border-zinc-700/50 transition hover:bg-zinc-800 hover:text-white"
                        >
                            <ArrowLeft size={14} />
                            Zurück zur Übersicht
                        </Link>
                    </div>
                </div>
            </header>

            {/* Menu List Content */}
            <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
                <div className="space-y-12">
                    {category.data.map((group, groupIdx) => (
                        <div
                            key={groupIdx}
                            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm"
                        >
                            {/* Group Header (if category title or group price exists) */}
                            {(group.Category || group.Price) && (
                                <div className="mb-8 border-b border-zinc-800 pb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                                        {group.Category && (
                                            <h2 className="font-serif text-2xl font-normal tracking-wide text-amber-400 sm:text-3xl">
                                                {group.Category}
                                            </h2>
                                        )}
                                        {group.Price && (
                                            <span className="text-2xl font-bold text-amber-500">
                                                {group.Price}
                                            </span>
                                        )}
                                    </div>
                                    {group.Description && (
                                        <p className="mt-2 text-xs italic text-zinc-400 sm:text-sm">
                                            {group.Description}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Items List Grid */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {group.Items?.map((item, itemIdx) => (
                                    <div
                                        key={itemIdx}
                                        className="flex flex-col justify-between rounded-xl border border-zinc-800/40 bg-zinc-900/60 p-5 transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/90"
                                    >
                                        <div>
                                            {/* Title & Price */}
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="text-base font-semibold text-zinc-100 sm:text-lg">
                                                            {item.Title}
                                                        </h3>
                                                        {item.Icon && (
                                                            <span className="text-sm">
                                                                {item.Icon}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {item.Note && (
                                                        <span className="inline-block text-xs text-amber-500/80 font-medium">
                                                            {item.Note}
                                                        </span>
                                                    )}
                                                </div>

                                                {item.Price && (
                                                    <span className="shrink-0 text-base font-bold text-amber-400">
                                                        {item.Price}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Description */}
                                            {item.Description && (
                                                <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                                                    {item.Description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Options / Add-ons */}
                                        {item.Options &&
                                            item.Options.length > 0 && (
                                                <div className="mt-4 border-t border-zinc-800/60 pt-3 space-y-2">
                                                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                                                        Optionen / Beilagen:
                                                    </span>
                                                    <div className="space-y-1.5">
                                                        {item.Options.map(
                                                            (opt, optIdx) => (
                                                                <div
                                                                    key={optIdx}
                                                                    className="flex items-center justify-between rounded-lg bg-zinc-800/40 px-3 py-1.5 text-xs text-zinc-300"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-medium">
                                                                            {
                                                                                opt.Label
                                                                            }
                                                                        </span>
                                                                        {opt.Note && (
                                                                            <span className="text-[11px] text-zinc-500">
                                                                                (
                                                                                {
                                                                                    opt.Note
                                                                                }

                                                                                )
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {opt.Price && (
                                                                        <span className="font-semibold text-amber-400">
                                                                            {
                                                                                opt.Price
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Allergen Notice */}
                <div className="mt-16 flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-xs text-zinc-400">
                    <Info size={20} className="shrink-0 text-amber-500" />
                    <div>
                        <h4 className="font-semibold text-zinc-200 uppercase tracking-wider mb-1">
                            Allergene & Zusatzstoffe
                        </h4>
                        <p className="leading-relaxed">
                            Bei Fragen zu den in unseren Gerichten enthaltenen
                            Allergenen und Zusatzstoffen wenden Sie sich bitte
                            an unser Servicepersonal. Wir informieren Sie gerne!
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
