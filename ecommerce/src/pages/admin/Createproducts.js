import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productCreateFailure, productCreateSuccess, productCreatePending } from '../../redux/productSlice';

const Createproducts = () => {
  const [productImg, setProductImg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    desc: '',
    price: ''  
  })
 
  const dispatch = useDispatch();
  
 /* const [formData, setFormData] = useState({});
  const handleChange = (e) => {
 setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData)*/

  const handleProductSumbit = async (e) => {
    e.preventDefault();
    try {
      dispatch(productCreatePending());
      const res = await fetch('http://localhost:5000/api/create-product', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name, brand, price, desc, image: productImg }),
      });
      console.log(res)
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(productCreateFailure(data.message));
      } else {
        dispatch(productCreateSuccess(data));
      }
    } catch (err) {
      console.log(err);
      dispatch(productCreateFailure(err.message));
    }
  };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader()
    if (file) {
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setProductImg(reader.result)
        }
    }else{
      setProductImg("")
    }
  };
  console.log(productImg)

  const handleChange = (e) => {
    
    const file = e.target.files[0]
    console.log(file)
    setProductImg(URL.createObjectURL(file));
  };


  return (
    <>
      <div style={styles.StyledCreateProduct}>
        <form style={styles.StyledForm} onSubmit={handleProductSumbit}>
          <h3>Create a Product</h3>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          <select id="brand" onChange={(e) => {
              setBrand(e.target.value)
            }} style={styles.select}>
            <option value="">Select brand</option>
            <option value="iphone">iphone</option>
            <option value="tekno">tekno</option>
            <option value="infinix">infinix</option>
          </select>
          <input
            type="text"
            id="name"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value)
            }}
            required
            style={styles.input}
          />
          <input
            type="text"
            id="price"
            placeholder="price"
            onChange={(e) => {
              setPrice(e.target.value)
          }}
            required
            style={styles.input}
          />
          <input
            type="text"
            id="desc"
            placeholder="description"
            onChange={(e) => {
              setDesc(e.target.value)
          }}
            required
            style={styles.input}
          />
          <button>Submit</button>
        </form>
        <div style={styles.ImagePreview}>
          {productImg ? (
            <img src={productImg} alt="product" style={styles.img} />
          ) : (
            <p>Image preview will appear here</p>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  StyledForm: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    marginTop: '2rem',
  },
  input: {
    padding: '7px',
    minHeight: '30px',
    outline: 'none',
    borderRadius: '5px',
    border: '1px solid rgb(182, 182, 182)',
    margin: '0.3rem 0',
  },
  select: {
    padding: '7px',
    minHeight: '30px',
    outline: 'none',
    borderRadius: '5px',
    border: '1px solid rgb(182, 182, 182)',
    margin: '0.3rem 0',
    color: 'rgb(95, 95, 95)',
  },
  inputFocus: {
    border: '2px solid rgb(0, 208, 255)',
  },
  StyledCreateProduct: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  ImagePreview: {
    margin: '2rem 0 2rem 2rem',
    padding: '2rem',
    border: '1px solid rgb(183, 183, 183)',
    maxWidth: '300px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(78, 78, 78)',
  },
  img: {
    maxWidth: '100%',
  },
};

export default Createproducts;

