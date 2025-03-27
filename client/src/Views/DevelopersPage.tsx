import { useEffect, useState, useRef } from 'react';
import Background from './Background';
import Footer from '../Components/Footer';

interface Developer {
    id: string;
    name: string;
    images: {
        image: string;
    };
}

const DevelopersPage = () => {
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('https://api.papopbot.com/api/developers')
            .then(response => response.json())
            .then(data => setDevelopers(data))
            .catch(error => console.error('Error fetching developers:', error));
    }, []);

    const SCROLL_SPEED_DOWN = 3; 
    const SCROLL_SPEED_UP = 3; 

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (scrollContainerRef.current) {
                e.preventDefault();

                if (e.deltaY > 0) {
                    scrollContainerRef.current.scrollLeft += e.deltaY * SCROLL_SPEED_DOWN;
                } else {
                    scrollContainerRef.current.scrollLeft += e.deltaY * SCROLL_SPEED_UP;
                }
            }
        };

        document.body.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            document.body.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className="w-full h-screen overflow-hidden">
            <Background>
                <div className='flex flex-col'>
                    <div className='text-4xl font-bold text-white p-5'>
                        Papop-bot Developers
                    </div>
                    <div
                        ref={scrollContainerRef}
                        className="flex flex-row items-center overflow-x-auto overflow-y-hidden scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {developers.slice(0, 8).map((developer) => (
                            <div
                                key={developer.id}
                                className="flex-shrink-0 p-4 h-[100%/3] flex items-center justify-center cursor-pointer"
                            >
                                <img onClick={() => window.location.href = `/developers/${developer.id}`}
                                    src={developer.images.image}
                                    alt={developer.name}
                                    className="hover:scale-110 transform transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                    <Footer />
                </div>
            </Background>
        </div>
    );
};

export default DevelopersPage;