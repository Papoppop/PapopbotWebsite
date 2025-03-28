import { useEffect, useState } from 'react';
import Background from './Background';
import Footer from '../Components/Footer';

interface Developer {
    id: string;
    name: string;
    images: {
        image: string;
        profile: string;
        profileWafer: string;
    };
}

const DevelopersPage = () => {
    const [developers, setDevelopers] = useState<Developer[]>([]);

    useEffect(() => {
        let isMounted = true;
        fetch('https://api.papopbot.com/api/developers')
            .then(response => response.json())
            .then(data => {
                if (isMounted) {
                    setDevelopers(data);
                }
            })
            .catch(error => console.error('Error fetching developers:', error));
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="flex flex-col">
            <Background>
                <div className="flex-1 flex flex-col">
                    <div className='text-4xl lg:text-[4rem] font-bold text-white p-5 text-center drop-shadow-lg'>
                        Papop-bot Developers
                    </div>
                    <div className="flex-1 flex flex-wrap justify-center content-start pb-8 mx-[20%] my-[6.8%]">
                        {developers.slice(0, 8).map((developer) => (
                            <div
                                key={developer.id}
                                className="bg-white rounded-2xl shadow-lg m-4 overflow-hidden cursor-pointer hover:scale-110 transform transition-transform duration-300 "
                                onClick={() => window.location.href = `/developers/${developer.id}`}
                            >
                                <img 
                                    src={developer.images.profile}
                                    alt={developer.name}
                                    className="rounded-t-2xl h-48 w-48 object-cover transition-opacity duration-150 hover:opacity-0"
                                />
                                <img 
                                    src={developer.images.profileWafer}
                                    alt={developer.name}
                                    className="rounded-t-2xl h-48 w-48 object-cover absolute top-0 left-0 transition-opacity duration-150 opacity-0 hover:opacity-100"
                                />
                                <div className="p-2 text-center font-semibold">{developer.name}</div>
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