import { useAppContext } from "../context/AppContext"
import ProductCard from "./ProductCard"

const BestSeller = () => {

  const { products } = useAppContext()

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      {/* <div className='grid grid-cols grid-flow-row mt-6 gap-6'> */}
<div className="grid gap-10 mt-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-items-center">
        {products.filter(product => product.inStock).slice(0, 5).map((product, index) =>
          <ProductCard product={product} key={index} />
        )}
      </div>
    </div>
  )
}

export default BestSeller