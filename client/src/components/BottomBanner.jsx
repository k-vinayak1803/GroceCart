import { assets, features } from "../assets/assets"
import { Link } from "react-router-dom"

function BottomBanner() {
  return (
    <div className="relative mt-24 h-145 sm:h-160 md:h-auto md:w-full min-w-[335px]">
        <img src={assets.bottom_banner_image} alt="banner" className="w-full h-full hidden md:block" />
        <img src={assets.bottom_banner_image_sm} alt="banner" className="w-full h-full md:hidden object-contain"  />
        <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-8 md:pt-0 xl:pr-[15%] md:pr-[10%]  
        px-4 ">
            <div>
            <h1 className="text-4xl lg:text-4xl md:text-3xl font-semibold text-primary md:mb-3 mb-6">We are the Best</h1>
            {features.map((feature,index)=>(
                <div key={index} className="flex items-center gap-4 mt-2">
                    <img src={feature.icon} alt={feature.title} className="xl:w-11 lg:w-7 w-9"/>
                    <div>
                    <h3 className="text-xl md:text-sm lg:text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-500/700 text-sm md:text-xs lg-text-md">{feature.description}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default BottomBanner;