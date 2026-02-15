import Image from "next/image";
import Link from "next/link";

const ResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl w-full items-center">
        
        {/* Left side - Image container */}
        <div className="relative flex-shrink-0 w-full lg:w-[578px] lg:h-[499px]">
          <div className="flex justify-center">
            <Image
              src="https://i.ibb.co/0VJN21qK/professona-cv.jpg"
              className="rounded-xl object-cover w-full max-w-[600px] h-auto"
              alt="professional-cv"
              width={578}
              height={499}
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col justify-center w-full lg:w-[818px] lg:h-[499px] text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Create Your{" "}
            <span className="text-[#28C76F]">AI-Powered Resume</span>
          </h1>

          <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
            Let our AI technology help you build a professional resume tailored
            to your skills, experience, and career goals.
          </p>

          <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
            Follow these simple steps to create a standout resume that will get
            you noticed by top employers.
          </p>

          <Link href="/stepper" className="mt-4">
            <button className="w-full cursor-pointer sm:w-auto bg-[#22C55E] text-white px-8 sm:px-10 py-3 rounded-md font-medium hover:bg-green-600 transition text-lg">
              Start Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
