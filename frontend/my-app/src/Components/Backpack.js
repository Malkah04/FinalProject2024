import React from 'react'
import { useEffect,useState } from 'react'; 

export default function Backbag() {
     const [products, setProducts] = useState([]);
       const [filteredProducts, setFilteredProducts] = useState([]);
       const [minPrice, setMinPrice] = useState('');
         const [maxPrice, setMaxPrice] = useState('');
        const [detail, setDetail] = useState(null);
        const [id, setId] = useState(null)
        const [visiable, setvisiable] = useState(false)
        const [num, setnum] = useState(1)
    
    
      useEffect(() => {
        fetch('http://localhost:7000/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
      }, []);
    
      const handleFilter = () => {
        const min = parseFloat(minPrice) || 0; 
        const max = parseFloat(maxPrice) || Infinity; 
    
        const filtered = products.filter(
          (product) => product.productPrice >= min && product.productPrice <= max
        );
        setFilteredProducts(filtered);
      };
     const details = (id) => {
        setId(id);
        setvisiable(true);
      };
        const closeDetails = () => {
          setvisiable(false); 
        };

        const AddToCart = (detail) => {
          const EmptyCart = {
            cartItems: [
    
            ],
    
            
            totalItems: 0,
            totalPrice: 0
          };
         
         
          let loccart = localStorage.getItem('cart');
     
    const Mycart = JSON.parse (loccart) ? JSON.parse(loccart) : EmptyCart;
      Mycart.cartItems.push(detail);
      Mycart.totalItems +=1;
      Mycart.totalPrice = parseInt(Mycart.totalPrice) +parseInt (detail.productPrice);
    
          
          alert(`Added ${detail.productName} to the cart`) 
          
          
          localStorage.setItem('cart', JSON.stringify(Mycart));
         
    
        }; 
        useEffect(() => {
          if (id) {
            const pro = products.find((product) => product._id === id);
            setDetail(pro);
          }
        }, [id]);
        function add(id){
          let pro=products.find((product) => product._id === id);
          if (!pro) {
            return;
          }
          if(pro.productQuantity>num){
            setnum(num+1);
          }
        }
        function minus(){
          if(num>1){
            setnum(num-1);
          }
        }
      
    
      let display = filteredProducts.length > 0 ? filteredProducts : products;
    
    
  return (
    <div>
        <div>
      <h1> Back bag </h1>
      <p className='text'>
      Explore Chic Bags' exclusive backpack collection, 
      crafted for style and practicality. Whether it's a busy day at work, a stroll through campus, 
      or an exciting adventure, our backpacks are designed to keep up with your lifestyle.
       With spacious interiors, ergonomic straps, and premium durability,
        Chic Bags ensures you carry your essentials with ease and elegance. 
      Redefine your everyday look with a backpack that blends fashion and function seamlessly!
      </p>
      <div >
        <div className='in'>
        <label className='min-price '>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
          />
        </label>
        <br></br>
        <label className='max-price ' >
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="1000"
          />
        </label>
        <br></br>
        </div>
        <button className='Buton' onClick={handleFilter} >
          Apply Filter
        </button>
      </div>
      <div className='proo d' style={{display:'flex', flexWrap:'wrap', margin:'10px'}}>
      {display
        .filter((product) => product.productCategory === 'Backpack')
        .map((product) => (
          <div className='prod s' key={product._id} style={{width:'290px', justifyContent:'center'}} >
            <img  src={product.productImage} alt={product.productName} style={{width:"260px" , height:"300px"}} />
            <p className="pl" onClick={() => details(product._id)} style={{marginTop:'-50px'}}>+</p>
            <p className='product_name' >{product.productName}</p>
            <p className='product_price' >Price: {product.productPrice}</p>
          </div>
        ))}
 {visiable? ( <div className="detail">
      {id && detail && (
        <div>
          <div className='close'>
          <i  onClick={() => closeDetails()} class="fa-solid fa-x"></i>
          </div>
          <h2>{detail.productName}</h2>
          <img src={detail.productImage} alt={detail.productName} />
          <p>{detail.productDescription}</p>
          <div className='count'>
                <span className='p' onClick={() => add(detail._id)}>+</span>
                <span className='n'>{num}</span>
                <span className='m' onClick={() => minus()}>-</span>
              </div>
          <p>Price: {detail.productPrice} LE</p>
          
          <button className='bt'    onClick={() => AddToCart(detail)}>Add to cart</button>
        
        
        </div>
      )}

</div>):
    (null)
    }
   
</div>
</div>
        
    </div>
  )
}
