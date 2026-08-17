import Link from 'next/link';
import HeroSection from '@/app/components/home/HeroSection';
import MenuSection from './components/home/MenuSection';

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <MenuSection />
        </main>
    );
}
