import Background from "./Background";
import AboutUsText from "../Components/AboutUsText";

const AboutUs = () => {

  return (
    <Background>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              About Us: Our Journey
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-white">
              Great achievements come from small beginnings...
            </p>
          </div>

          <div className="flex flex-row justify-center items-center">
            <div className="bg-red-500 w-[calc(50%)] h-full p-2">
              Navigator
            </div>
            <div className="bg-red-200 w-[calc(50%)] h-screen p-2">
              <AboutUsText 
              header="2019: The Beginning" 
              details="In 2019, we embarked on a journey to revolutionize the way people connect with their passions. Our mission was clear: to create a platform that would empower individuals to discover and pursue their interests like never before."
              />

              <AboutUsText 
              header="2020: The Beginning" 
              details="In 2020, we embarked on a journey to revolutionize the way people connect with their passions. Our mission was clear: to create a platform that would empower individuals to discover and pursue their interests like never before."
              />

              <AboutUsText 
              header="2021: The Beginning" 
              details="In 2020, we embarked on a journey to revolutionize the way people connect with their passions. Our mission was clear: to create a platform that would empower individuals to discover and pursue their interests like never before."
              />

              <AboutUsText 
              header="2022: The Beginning" 
              details="In 2020, we embarked on a journey to revolutionize the way people connect with their passions. Our mission was clear: to create a platform that would empower individuals to discover and pursue their interests like never before."
              />


            </div>
          </div>


        </div>
      </div>
    </Background>
  );
};

export default AboutUs;