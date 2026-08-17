'use client';

import { useState } from 'react';
import Link from 'next/link';

// 1. Import đủ 6 file JSON thực đơn
import appetizerData from '@/app/data/appetizer.json';
import dessertData from '@/app/data/dessert.json';
import drinksData from '@/app/data/drinks.json';
import lunchData from '@/app/data/lunchMenu.json';
import mainData from '@/app/data/mainDish.json';
import sushiData from '@/app/data/sushi.json';

// Interfaces chuẩn TypeScript (cho phép null/undefined)
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

// 2. Cấu hình 6 danh mục dữ liệu
const menuCategories = [
    {
        id: 'vorspeise',
        label: 'VORSPEISE',
        icon: '🥢',
        path: '/menu/vorspeise',
        data: appetizerData as unknown as MenuCategoryGroup[],
    },
    {
        id: 'mittagsmenue',
        label: 'MITTAGSMENÜ',
        icon: '🍱',
        path: '/menu/mittagsmenue',
        data: lunchData as unknown as MenuCategoryGroup[],
    },
    {
        id: 'hauptspeise',
        label: 'HAUPTSPEISE',
        icon: '🍜',
        path: '/menu/hauptspeise',
        data: mainData as unknown as MenuCategoryGroup[],
    },
    {
        id: 'sushi',
        label: 'SUSHI',
        icon: '🍣',
        path: '/menu/sushi',
        data: sushiData as unknown as MenuCategoryGroup[],
    },
    {
        id: 'dessert',
        label: 'DESSERT',
        icon: '🍨',
        path: '/menu/dessert',
        data: dessertData as unknown as MenuCategoryGroup[],
    },
    {
        id: 'drinks',
        label: 'DRINKS',
        icon: '🍹',
        path: '/menu/drinks',
        data: drinksData as unknown as MenuCategoryGroup[],
    },
];

export default function MenuSection() {
    // State lưu Tab đang chọn
    const [activeTab, setActiveTab] = useState('vorspeise');

    // Lấy thông tin danh mục đang active
    const activeCategory =
        menuCategories.find((cat) => cat.id === activeTab) || menuCategories[0];

    // Lấy nhóm món chính (ưu tiên nhóm đầu tiên)
    const mainGroup = activeCategory.data[0];

    // Tính tổng số món trong nhóm
    const totalItemsCount = mainGroup?.Items?.length || 0;

    // Lấy tối đa 3 món đầu tiên để xem trước
    const previewItems = mainGroup?.Items ? mainGroup.Items.slice(0, 3) : [];

    return (
        <section id="menu" className="bg-zinc-50 py-20 text-zinc-900 sm:py-28">
            <div className="mx-auto max-w-4xl px-6 sm:px-10">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.35em] text-amber-600">
                        Kazoku Restaurant
                    </span>
                    <h2 className="mt-3 font-serif text-3xl font-normal uppercase tracking-[0.15em] text-zinc-900 sm:text-4xl">
                        Unsere Speisekarte
                    </h2>
                    <div className="mx-auto mt-4 h-0.5 w-12 bg-amber-500"></div>
                    <p className="mt-4 text-sm text-zinc-600 sm:text-base">
                        Entdecken Sie unsere Spezialitäten im Überblick
                    </p>
                </div>

                {/* 6 Navigation Tabs */}
                <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
                    {menuCategories.map((cat) => {
                        const isActive = activeTab === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`
                                    flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300
                                    ${
                                        isActive
                                            ? 'bg-zinc-900 text-white shadow-md scale-105'
                                            : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-200/70'
                                    }
                                `}
                            >
                                <span className="text-sm">{cat.icon}</span>
                                <span>{cat.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Khung hiển thị xem trước (Preview) */}
                <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 sm:p-10">
                    {/* Header Tab */}
                    <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">
                                {activeCategory.icon}
                            </span>
                            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-zinc-900">
                                {activeCategory.label}
                            </h3>
                        </div>
                        <span className="text-xs font-medium text-zinc-400">
                            3 von {totalItemsCount} Gerichten
                        </span>
                    </div>

                    {/* Tiêu đề Nhóm / Món chung */}
                    {mainGroup?.Category && (
                        <div className="mb-6 flex items-baseline justify-between border-b border-amber-500/20 pb-3">
                            <div>
                                <h4 className="font-serif text-2xl font-bold text-amber-600 sm:text-3xl">
                                    {mainGroup.Category}
                                </h4>
                                {mainGroup.Description && (
                                    <p className="mt-1 text-xs italic text-zinc-500 sm:text-sm">
                                        {mainGroup.Description}
                                    </p>
                                )}
                            </div>
                            {mainGroup.Price && (
                                <span className="text-2xl font-bold text-amber-600 sm:text-3xl">
                                    {mainGroup.Price}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Danh sách 3 món Preview */}
                    <div className="space-y-6">
                        {previewItems.map((item, index) => (
                            <div
                                key={index}
                                className="border-b border-zinc-100 pb-5 last:border-0 last:pb-0"
                            >
                                {/* Tên món + Ghi chú + Giá món đơn */}
                                <div className="flex items-baseline justify-between gap-4">
                                    <div className="flex items-baseline gap-2">
                                        <h5 className="text-base font-semibold text-zinc-900 sm:text-lg">
                                            {item.Title}
                                        </h5>
                                        {item.Note && (
                                            <span className="text-xs font-normal text-zinc-400">
                                                {item.Note}
                                            </span>
                                        )}
                                        {item.Icon && (
                                            <span className="text-xs">
                                                {item.Icon}
                                            </span>
                                        )}
                                    </div>

                                    {item.Price && (
                                        <span className="shrink-0 font-bold text-amber-600">
                                            {item.Price}
                                        </span>
                                    )}
                                </div>

                                {/* Mô tả món */}
                                {item.Description && (
                                    <p className="mt-1 text-xs italic text-zinc-500 sm:text-sm">
                                        {item.Description}
                                    </p>
                                )}

                                {/* Các tùy chọn Options */}
                                {item.Options && item.Options.length > 0 && (
                                    <div className="mt-3 space-y-1.5">
                                        {item.Options.map((opt, optIdx) => (
                                            <div
                                                key={optIdx}
                                                className="flex items-center justify-between rounded-md bg-zinc-50/70 px-3 py-1.5 text-xs text-zinc-700 sm:text-sm"
                                            >
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-medium">
                                                        {opt.Label}
                                                    </span>
                                                    {opt.Note && (
                                                        <span className="text-[11px] text-zinc-400">
                                                            {opt.Note}
                                                        </span>
                                                    )}
                                                </div>
                                                {opt.Price && (
                                                    <span className="font-bold text-amber-600">
                                                        {opt.Price}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Link xem toàn bộ món của Tab này */}
                    <div className="mt-8 border-t border-zinc-100 pt-6 text-right">
                        <Link
                            href={activeCategory.path}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 transition hover:text-amber-700"
                        >
                            <span>
                                Alle {totalItemsCount} {activeCategory.label}{' '}
                                anzeigen
                            </span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>

                {/* Nút dẫn đến toàn bộ trang Menu */}
                <div className="mt-10 text-center">
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-amber-600 hover:shadow-lg"
                    >
                        <span>Gesamte Speisekarte anzeigen</span>
                        <span>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
