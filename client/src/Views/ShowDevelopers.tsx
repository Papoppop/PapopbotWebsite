import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Background from "./Background";
import Footer from "../Components/Footer";

interface Developer {
  id: number;
  name: string;
  gender: string;
  height: number;
  birthdate: string;
  details: {
    id: number;
    devid: number;
    likes: string;
    dislikes: string;
    personality: string;
  };
  images: {
    id: number;
    devid: number;
    devsticker1: string;
    devsticker2: string;
    devsticker3: string;
    mouthopen: string;
    image: string;
    profileWafer: string;
    profile: string;
  };
  positions: Array<{
    id: number;
    devid: number;
    position: string;
  }>;
}

const ShowDevelopers = () => {
  const { id } = useParams();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imagesToLoad, setImagesToLoad] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.papopbot.com/api/developers/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch developer with ID ${id}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setDeveloper(data[0]);
          prepareImagePreloading(data[0]);
        } else {
          setDeveloper(data);
          prepareImagePreloading(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching developer:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // Prepare image URLs for preloading
  const prepareImagePreloading = (dev: Developer) => {
    if (!dev || !dev.images) return;
    
    const imagesToPreload = [
      dev.images.profile,
      dev.images.image,
      dev.images.devsticker1,
      dev.images.devsticker2,
      dev.images.devsticker3
    ].filter(Boolean); // Remove any undefined or null values
    
    setImagesToLoad(imagesToPreload);
  };

  // Handle image preloading
  useEffect(() => {
    if (imagesToLoad.length === 0) return;
    
    // If there are no images to load, consider them all loaded
    if (imagesToLoad.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const preloadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages(prev => [...prev, src]);
          resolve(src);
        };
        img.onerror = () => {
          // Consider the image as loaded even if it fails to prevent blocking
          setLoadedImages(prev => [...prev, src]);
          resolve(src);
        };
      });
    };

    const preloadAllImages = async () => {
      try {
        await Promise.all(imagesToLoad.map(preloadImage));
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Consider images loaded even if there's an error
        setImagesLoaded(true);
      }
    };

    preloadAllImages();
  }, [imagesToLoad]);

  // Calculate loading progress
  const loadingProgress = imagesToLoad.length > 0 
    ? Math.round((loadedImages.length / imagesToLoad.length) * 100) 
    : 0;

  if (loading) {
    return (
      <Background>
        <div className="w-full h-screen flex justify-center items-center">
          <div className="text-center p-8 text-white text-2xl">Loading developer details...</div>
        </div>
      </Background>
    );
  }

  if (error) {
    return (
      <Background>
        <div className="w-full h-screen flex justify-center items-center">
          <div className="text-center p-8 text-red-500 text-2xl">Error: {error}</div>
        </div>
      </Background>
    );
  }

  if (!developer) {
    return (
      <Background>
        <div className="w-full h-screen flex justify-center items-center">
          <div className="text-center p-8 text-white text-2xl">Developer not found</div>
        </div>
      </Background>
    );
  }

  // Show loading indicator while images are loading
  if (!imagesLoaded) {
    return (
      <Background>
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className="text-center p-8 text-white text-2xl">Loading images...</div>
          <div className="w-64 bg-gray-300 rounded-full h-2.5 mb-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="text-white">{loadingProgress}%</div>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-center items-center py-8">
            <div className="flex flex-col items-center p-5">
              <img src={developer.images.profile} alt={developer.name} className="w-60 md:hidden rounded-full" />
              <img src={developer.images.image} alt={developer.name} className="hidden md:block" />
            </div>

            <div className="pl-4 justify-center items-center lg:items-start flex flex-col max-w-3xl">
              <div className="font-bold text-white drop-shadow-md text-center text-4xl p-5 md:text-[3rem] lg:text-[5rem] md:text-left">
                <div>{developer.name.toUpperCase()}</div>

                <div>
                  {developer.positions.map((position) => (
                    position.position === 'CEO' 
                      ? (<div className="font-semibold text-lg lg:text-[2rem]" key={position.id}>Chief's Executive Organizer</div>) 
                      : (<div key={position.id} className="font-semibold text-lg lg:text-[2rem]">{position.position}</div>)
                  ))}
                </div>

                <div className="font-bold text-2xl pb-4 lg:mt-5 text-white lg:text-3xl drop-shadow-md">
                  {developer.name}'s Information
                </div>

                <div className="flex flex-col text-xl bg-white p-4 w-full rounded-2xl">
                  <table className="table-auto text-blue-950 text-[1rem] lg:text-[1.5rem] text-left font-medium ">
                    <tbody>
                      <tr>
                        <td className="p-1 font-bold">Gender:</td>
                        {developer.gender === "Male" 
                          ? (<td className="p-1 "><p className="bg-sky-300 text-white rounded-2xl px-4 font-bold w-fit">{developer.gender}</p></td>) 
                          : <td className="p-1 "><p className="bg-pink-300 text-white rounded-2xl px-4 font-bold w-fit">{developer.gender}</p></td>}
                      </tr>
                      <tr>
                        <td className="p-1 font-bold">Height:</td>
                        <td className="p-1">{developer.height} cm</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-bold">Birthdate:</td>
                        <td className="p-1">{new Date(developer.birthdate).toLocaleDateString('en-GB').slice(0, 5)}</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-bold">Personality:</td>
                        <td className="p-1">{developer.details.personality}</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-bold">Likes:</td>
                        <td className="p-1">{developer.details.likes}</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-bold">Dislikes:</td>
                        <td className="p-1">{developer.details.dislikes}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-row justify-evenly my-10 md:space-x-3 lg:space-x-5">
                  <img className="h-32 md:h-auto max-h-50" src={developer.images.devsticker1} alt="Sticker 1" />
                  <img className="h-32 md:h-auto max-h-50" src={developer.images.devsticker2} alt="Sticker 2" />
                  <img className="h-32 md:h-auto max-h-50" src={developer.images.devsticker3} alt="Sticker 3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Background>
  );
};

export default ShowDevelopers;