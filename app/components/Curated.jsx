"use client"
import React, { useState, useEffect } from 'react'
import { FaFire } from "react-icons/fa"
import Image from 'next/image'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Link from 'next/link'
import { FaInfo } from "react-icons/fa";
import { createClient } from 'pexels';

const Curated = () => {
    const [downloadBTN, setdownloadBTN] = useState(false)
    const [details, setDetails] = useState(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [curatedPhotos, setCuratedPhotos] = useState([])

    const client = createClient(process.env.NEXT_PUBLIC_PEXELS_APIKEY);

    useEffect(() => {
        client.photos.curated({ per_page: 20 }).then(photos => {
            setCuratedPhotos(photos.photos)

        });
    }, [])





    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
            detailsChanged(s) {
                setDetails(s.track.details)
            }
        }
    )

    useEffect(() => {
        if (instanceRef.current) {
            instanceRef.current.update(); // ensures slider knows about new children
        }
    }, [curatedPhotos]);


    function scaleStyle(idx) {
        if (!details) return {}
        const slide = details.slides[idx]
        const scale_size = 0.07
        const scale = 1 - (scale_size - scale_size * slide.portion)
        return {
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`,
            transition: 'transform 0.3s ease-in-out'
        }
    }

    return (
        <div className='flex flex-col gap-8 pt-[150px] items-center w-full h-fit relative' id='Curated'>
            <h1 className='Oswald text-gray-800 text-4xl flex gap-5'>
                <span className='flex gap-1 gradient5 Lobster font-bold text-[40px] items-center'>
                    <FaFire /> Curated
                </span>
                For You
            </h1>

            {/* Carousel */}
            {curatedPhotos.length > 0 && (<div className="relative max-w-[92%] md:max-w-[80%] w-full">
                <div ref={sliderRef} className="keen-slider h-[300px] md:h-[430px] lg:h-[650px] rounded-2xl overflow-hidden shadow1">
                    {curatedPhotos.map((photo, idx) => (
                        <div key={idx} className="keen-slider__slide flex items-center justify-center zoom-out__slide">
                            <div style={scaleStyle(idx)} className='w-full h-full relative rounded-xl overflow-hidden' onMouseEnter={() => setdownloadBTN(true)}
                                onMouseLeave={() => setdownloadBTN(false)}>
                                <Image
                                    src={photo.src.original}
                                    alt={`image-${idx}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={false}
                                />
                                <Link href={photo.url} download target='_blank' className={`p-3 rounded-full bg-gray-400/40 justify-center items-center absolute left-3 top-3 hover:bg-white/50 ease-in-out duration-150 ${downloadBTN ? 'flex' : 'lg:hidden'}`}><FaInfo /></Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrows */}
                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={() => instanceRef.current?.prev()}
                            className="left-2"
                        />
                        <Arrow
                            onClick={() => instanceRef.current?.next()}
                            className="right-2"
                        />
                    </>
                )}
            </div>)}
        </div>
    )
}

export default Curated

// Arrow Component
function Arrow({ left, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`absolute top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ${className}`}
        >
            <svg
                className={`w-6 h-6 ${left ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    )
}
