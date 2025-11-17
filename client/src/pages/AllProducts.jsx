import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {

    const { products, searchQuery ,axios } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter
                (product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        } else {
            setFilteredProducts(products)
        }
    }, [products, searchQuery])
    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'>All Products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            <div className="grid gap-10 mt-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center">
                {filteredProducts.filter(product => product.inStock).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default AllProducts