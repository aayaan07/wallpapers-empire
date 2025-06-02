import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { IoSparkles } from "react-icons/io5";

const Hero = () => {

  const StarSVG = ({ fillClass }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        shapeRendering: "geometricPrecision",
        textRendering: "geometricPrecision",
        imageRendering: "optimizeQuality",
        fillRule: "evenodd",
        clipRule: "evenodd",
      }}
      viewBox="0 0 784.11 815.53"
    >
      <path
        className={fillClass}
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 
        207.96,29.37 371.12,197.68 392.05,407.74 
        20.93,-210.06 184.09,-378.37 392.05,-407.74 
        -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      />
    </svg>
  );

  const ButtonWithStars = ({ className, text, fillClass }) => (
    <Link className={className} href={`#${text}`}>
      {text}
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`star-${i + 1}`}>
          <StarSVG fillClass={fillClass} />
        </div>
      ))}
    </Link>
  );



  return (
    <div>

      <nav className='w-full h-fit py-3 px-10 flex lg:justify-between justify-center'>
        {/* Logo Box */}
        <div className='flex items-center justify-center gap-1 hover:transform-[translateY(-3px)] easeEffect cursor-pointer'>
          <Image src={"/logo.png"} width={28} height={28} className='mix-blend-darken' alt='Image' />
          <h3 className={`Jersey15 text-[34px] text-center text-[#0B1215] textShadow`}>WallpapersEmpire</h3>
        </div>

        {/* Links */}
        <div className='lg:flex gap-6 items-center hidden'>
          <Link href='#Explore' className='text-[16px] font-medium text-gray-900 Poppins rounded-xl p-[10px] hover:bg-[#e5e5e5] easeEffect'>Explore</Link>
          <Link href='https://github.com/aayaan07/wallpapers-empire' target="_blank" className='text-[16px] font-medium text-gray-900 Poppins rounded-xl p-[10px] hover:bg-[#e5e5e5] easeEffect'>Github</Link>
        </div>

      </nav>



      {/* Hero section */}
      <div className='w-full flex flex-col items-center pt-12 px-3 md:px-6'>

        {/* Credit Box  */}
        <div className='flex gap-2 justify-center items-center bg-[#FFFFF0] rounded-full py-2.5 px-4 shadow1'>
          <IoSparkles />
          <small className='text-gray-700 Poppins font-semibold text-[10px] md:text-[12px]'>Powered by beautiful imagery from <Link href="https://www.pexels.com/" target='_blank' className='gradient1'>Pexels</Link></small>
        </div>


        {/* Headings  */}
        <div className='flex flex-col gap-5 md:gap-7 items-center pt-7'>
          <h1 className='text-[72px] md:text-[84px] lg:text-[110px] Oswald font-bold text-center leading-20 lg:leading-26'>Endless <span className='Lobster gradient3'>Wallpapers.</span><br />Always <span className='Lobster gradient4'>Fresh.</span></h1>
          <h3 className='Poppins text-[14px] md:text-[16px] text-gray-500 text-center'>“From calming nature shots to vibrant digital art — discover fresh designs every day without lifting a finger.” <br /> <span className='text-[13px] text-gray-500 italic'> This site is a personal project and not intended for commercial use.</span></h3>
        </div>

        {/* Buttons  */}
        <div className='flex gap-8 pt-6 lg:pt-8 justify-center'>

          <ButtonWithStars className="curatedBTN" text="Curated" fillClass="curatedFill" />
          <ButtonWithStars className="exploreBTN" text="Explore" fillClass="exploreFill" />
        </div>






      </div>

    </div>
  )
}

export default Hero
