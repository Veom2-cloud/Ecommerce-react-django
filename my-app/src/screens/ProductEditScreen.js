import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from 'axios'

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductsDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImages(product.images);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, productId, history, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name: name,
        price: price,
        images: images,
        brand: brand,
        category: category,
        countInStock: countInStock,
        description: description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('images', file)
    formData.append('product_id', productId)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const { data } = await axios.post('/api/products/upload/',
        formData,
        config
      );
      setImages(data)
      setUploading(false)
    } catch (error) {
      setUploading(false);
    }
  }

  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>
      <FormContainer>
        <h1> Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>

              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            
            <Form.Group controlId="image">
            <Form.Label>Images</Form.Label>


              <Form.Control
                type="text"
                placeholder="Enter image"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              ></Form.Control>
              <label>
          images
          </label>
          <input
            name="images"
            type="file"
            onChange={uploadFileHandler} />
        
         
            </Form.Group>
           
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Stock</Form.Label>

              <Form.Control
                type="number"
                placeholder="Enter CountinStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Description">
              <Form.Label>Description</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
