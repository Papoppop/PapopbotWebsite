import Footer from "../Components/Footer"
import Background from "./Background"

const LandingPage = () => {
  return (
    <>
      <Background>
        <div className="bg-[url('/images/webcomponent/webbgblur.png')] bg-cover bg-size-[100%]">
        <div className="flex flex-col items-center justify-center space-y-20">
          <div className="flex flex-col lg:flex-row items-center lg:justify-evenly lg:space-x-40 my-20">
            <div className="flex flex-col items-center">
              <img src='/images/webcomponent/webicon.png' className="w-20" />
              <div className="flex flex-col">
              <div className="font-bold text-center bg-gradient-to-b from-white via-white to-yellow-200 text-xl md:text-[2rem] lg:text-[4rem] text-transparent bg-clip-text w-200">
                <p>“All your dreams can come true,</p>
                <p>if you have a courage to pursue them”</p>
              </div>
              <div className="text-white drop-shadow-sm mt-5 text-center">
                <div className="text-l lg:text-xl font-bold">Papop-bot - Virtual Classmate</div>
                <div className="text-md lg:text-l font-semibold">The first chatbot of Nakhonsawan School</div>
                <div>(not his quote, but his favorite one)</div>
              </div>
              </div>
            </div>
            <img className="opacity-100 lg:opacity-0 w-85" src='/images/webcomponent/papopbotsit.png' alt='papopbotsit' />
          </div>
        </div>
        </div>
        <Footer />
      </Background>
    </>
  )
}

export default LandingPage
