import Background from "./Background";

const AboutUs = () => {

  return (
    <Background>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Us: Our Journey
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Great achievements come from small beginnings...
          </p>
        </div>

        <div>
            <div className="font-bold text-white">2019</div>
        </div>

       
      </div>
    </div>
    </Background>
  );
};

export default AboutUs;