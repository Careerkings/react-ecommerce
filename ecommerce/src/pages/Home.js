
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsFetchFailure, productsFetchPending, productsFetchSuccess } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
// import { useQuery } from 'react-query';


const Home = () => {
    const { products, loading, error } = useSelector(state => state.product);
    const dispatch = useDispatch();
    
    // const query = useQuery()
    // console.log(query)
      
    useEffect(() => {
        const handleProductsFetch = async () => {
            try {
                dispatch(productsFetchPending());
                const res = await fetch('http://localhost:5000/products');
                if (!res.ok) {
                    throw new Error('Products couldnt be fetched');
                }
                const data= await res.json();
                console.log(data);
                dispatch(productsFetchSuccess(data));
            } catch (err) {
                dispatch(productsFetchFailure(err.message));
            }
        };
    
        handleProductsFetch();
    
    }, [dispatch]); 
    

    const handleClick = (product) => {
         dispatch(addToCart(product)); 
     };

    return (
        <div>
            {error ? error :
            loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {products && products.map(product => (
                        <div key={product.id}>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <p>{product.desc}</p>
                            <button onClick={() => handleClick(product)}>Add to Cart</button>
                            <img src={product.image} alt={product.name} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

  

export default Home;
