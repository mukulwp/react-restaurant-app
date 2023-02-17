import React from 'react'
import MenuItem from '../components/MenuItem'
import { useStateValue } from '../context/StateProvider'

const Menu = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  return (
    <section className='w-full grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {!foodItems ? <p>Loading...</p> : foodItems.map((item) => 
        <MenuItem item={item} title={item.title} price={item.price} calories={item.calories} photoURL={item.imageURL} />
    )}
    </section>
  )
}

export default Menu