import { assets } from "../assets/assets"
import { Link } from "react-router-dom"

function MainBanner() {
  return (
    <div className="relative mt-24 h-125 sm:h-160 md:h-auto md:w-full min-w-[335px]">
      <img src={assets.main_banner_bg} alt="banner" className="w-full h-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="banner" className="w-full h-full md:hidden object-contain" />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-5 md:pb-0 
        px-4 md:pl-18 lg:pl-24">
        <h1 className="transition-all duration-500 ease-in-out
         text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-center md:text-left 
            max-w-72 sm:max-w-90 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">Freshness You Can Trust, Savings You Will Love</h1>

        <div className="flex items-center mt-6 font-medium">
          <Link to={'/products'} className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded cursor-pointer">
            Shop Now
            <img className="md:hidden transition group-focus:translate-x-1" src={assets.white_arrow_icon} alt="arrow" /></Link>

          <Link to={'/products'} className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer">
            Explore Deals
            <img className="transition group-hover:translate-x-1" src={assets.black_arrow_icon} alt="arrow" /></Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner