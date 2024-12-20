import React from 'react'
import { useState } from 'react'
import './Addproduct.css'

export default function Addproduct() {
   const [name, setName] = useState('')
   const [price, setPrice] = useState()
   const [description, setDescription] = useState('')
   const [image, setImage] = useState('')
   const [quantity, setQuantity] = useState('1')
   const [category, setCategory] = useState('')
   const [error, setError] = useState(null)
   const [done, setDone] =   useState()

   const handleAddProduct = async (e)=>{
    e.preventDefault();
    try{
        const response = await fetch('http://localhost:7000/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productName:name,
            productPrice:parseInt(price),
            productDescription:description,
            productImage:image,
           productQuantity:parseInt(quantity),
           productCategory:category
          })
        })
        if(!response.ok){
          throw new Error('Failed to add product')
        }
        const data=await response.json()
        setDone(data.message)
        setError(null)
        setName('');
      setPrice(0);
      setDescription('');
      setImage(null);
      setQuantity(1);
        
    }
    catch(err) {
      setError('Failed to add product')
      setDone(null)
    }
   }

  return (
    <>
     <h1>Add Product</h1>
      <form className="fr" onSubmit={handleAddProduct}>
        <label>
          <div style={{ display: 'flex' }}>
            <h4 style={{ marginRight: '60px' }}>Product Name:</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              required
            />
          </div>
        </label>

        <label>
          <div style={{ display: 'flex' }}>
            <h4 style={{ marginRight: '58px' }}>Product Image:</h4>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
        </label>

        <label>
          <div style={{ display: 'flex' }}>
            <h4 style={{ marginRight: '20px' }}>Product Description:</h4>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </label>

        <label>
          <div style={{ display: 'flex' }}>
            <h4 style={{ marginRight: '68px' }}>Product Price:</h4>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </label>

        <label>
          <div style={{ display: 'flex' }}>
            <h4 style={{ marginRight: '32px' }}>Product Category:</h4>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        </label>

        <button type="submit">Add Product</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {done && <p style={{ color: 'green' }}>{done}</p>}

    </>
  )
}
