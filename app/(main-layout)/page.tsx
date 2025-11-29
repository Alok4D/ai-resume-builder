import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white px-4 md:px-8">
      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left Image */}
        <div className="flex justify-center">
          <Image
            src="https://i.ibb.co/0VJN21qK/professona-cv.jpg"
            className="rounded-xl object-cover w-full max-w-[600px] h-auto"
            alt="professional-cv"
            width={578}
            height={499}
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl sm:text-5xl md:text-4xl lg:text-6xl  font-bold leading-snug text-[#333333]">
            Create Your AI-<span className="text-[#22C55E]">Powered Resume</span>
          </h2>

          <p className="text-[#333333] mt-6 text-lg sm:text-xl md:text-xl lg:text-2xl">
            Let our AI technology help you build a professional resume tailored to your skills, experience, and career goals.
          </p>

          <p className="text-[#777777] text-base sm:text-lg mt-4">
            Follow these simple steps to create a standout resume that will get
            you noticed by top employers.
          </p>

          <Link href="/stepper" className="mt-8">
            <button className="w-full sm:w-auto bg-[#22C55E] text-white px-8 sm:px-10 py-3 rounded-md font-medium hover:bg-green-600 transition text-lg">
              Start Now
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
