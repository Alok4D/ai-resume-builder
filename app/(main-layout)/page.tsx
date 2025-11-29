import Image from "next/image";
import Link from "next/link";

const HomePage = () => {


  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="max-w-355 w-full px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-6">

        {/* Left Image */}
        <div className="flex justify-center">
          <Image src="https://i.ibb.co.com/0VJN21qK/professona-cv.jpg" className="rounded-xl w-144.5 h-124.75" alt="professonal-cv" width={800} height={500} />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-[5rem] font-bold leading-snug text-[#1E1E1E]">
            Create Your AI-<span className="text-[#22C55E]">Powered Resume</span>
          </h2>

          <p className="text-[#333333] mt-6 text-[1.5rem]">
            Let our AI technology help you build a professional resume tailored
            to your skills, experience, and career goals.
          </p>

          <p className="text-[#777777] text-[1.125rem] mt-4 text-base">
            Follow these simple steps to create a standout resume that will get
            you noticed by top employers.
          </p>

          <Link href="/stepper">
            <button className="mt-8 cursor-pointer bg-[#22C55E] text-white px-10 py-3 rounded-md font-medium hover:bg-green-600 transition">
              Start Now
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
