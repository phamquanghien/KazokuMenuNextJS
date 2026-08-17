import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/layout/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
    title: 'Kazoku Restaurant',
    description: 'Willkommen bei Kazoku Restaurant',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de">
            <body className={inter.className}>
                {/* Navigation luôn nằm ở đây để xuất hiện ở MỌI trang */}
                <Navbar />

                {/* Nội dung trang sẽ thay đổi tại đây */}
                <main>{children}</main>
            </body>
        </html>
    );
}
