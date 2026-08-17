import MenuSection from './components/home/MenuSection';
import AddressSection from './components/home/AddressSection';
import HeroSection from './components/home/HeroSection';

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <MenuSection />
            <AddressSection />
        </main>
    );
}
