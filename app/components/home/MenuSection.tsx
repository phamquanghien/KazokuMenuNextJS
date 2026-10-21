import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import mittagsangebot from '@/app/data/mittagsangebot.json';
import vorspeise from '@/app/data/vorspeise.json';
import kindermenu from '@/app/data/kindermenu.json';
import hauptspeise from '@/app/data/hauptspeise.json';
import sushi from '@/app/data/sushi.json';
import vegetarisch from '@/app/data/vegetarisch.json';
import dessert from '@/app/data/dessert.json';
import getranke from '@/app/data/getranke.json';

// Hàm đệ quy để đếm tổng số món (Items) trong cấu trúc JSON nhiều cấp
function countItems(node: unknown): number {
    if (!node) return 0;
    // Nếu là một mảng, duyệt qua từng phần tử
    if (Array.isArray(node)) {
        return node.reduce((total, item) => total + countItems(item), 0);
    }
    // Nếu là object, kiểm tra xem có thuộc tính 'Items' hay các cấp con không
    if (typeof node === 'object' && node !== null) {
        const record = node as Record<string, unknown>;
        let count = 0;
        // Nếu object này có mảng 'Items', cộng số lượng phần tử trong đó
        if (Array.isArray(record.Items)) {
            count += record.Items.length;
        }
        // Tiếp tục quét sâu vào các thuộc tính khác (trong trường hợp có sub-categories hoặc nhóm con)
        for (const key of Object.keys(record)) {
            if (key !== 'Items') {
                count += countItems(record[key]);
            }
        }
        return count;
    }
    return 0;
}

interface MenuCategoryGroup {
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
        count: countItems(mittagsangebot),
    },
    {
        id: 'vorspeise',
        title: 'Vorspeise',
        subtitle: 'Köstlichen kleinen Speisen für einen perfekten Start',
        note: 'Vorspeisen, Tatar/Tataki, Suppe, Salat',
        icon: '🥟',
        href: '/menu/vorspeise',
        count: countItems(vorspeise),
    },
    {
        id: 'kindermenu',
        title: 'Kindermenü',
        subtitle: 'Speisen für unseren kleinen Gäste',
        icon: '👶',
        href: '/menu/kindermenu',
        count: countItems(kindermenu),
    },
    {
        id: 'hauptspeise',
        title: 'Hauptspeise',
        subtitle: 'Authentische asiatische Spezialität',
        icon: '🍛',
        href: '/menu/hauptspeise',
        count: countItems(hauptspeise),
    },
    {
        id: 'sushi',
        title: 'Sushi',
        subtitle: 'Frischer Fisch und feinste Zutaten',
        note: 'Wir verwenden ausschließlich exquisiten "Label Rouge" Lachs- schottisch mit Gütezeichen- eine der höchsten Qualitätsstufen auf dem Markt',
        icon: '🍣',
        href: '/menu/sushi',
        count: countItems(sushi),
    },
    {
        id: 'vegetarisch',
        title: 'Vegetarisch',
        icon: '🌱',
        href: '/menu/vegetarisch',
        count: countItems(vegetarisch),
    },
    {
        id: 'dessert',
        title: 'Dessert',
        icon: '🍨',
        href: '/menu/dessert',
        count: countItems(dessert),
    },
    {
        id: 'getranke',
        title: 'Getränke',
        icon: '🍹',
        href: '/menu/getranke',
        count: countItems(getranke),
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
                        Bitte wählen Sie eine Kategorie, um unsere Spezialitäten
                        zu entdecken.
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
                                <p className="mt-1.5 text-xs font-semibold leading-relaxed text-amber-300/90 sm:text-sm">
                                    {cat.timeInfo}
                                </p>
                                <p className="mt-1 text-xs italic leading-relaxed text-rose-400/90">
                                    {cat.note}
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
