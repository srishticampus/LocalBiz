import React, { useEffect, useState } from 'react'
import BussinessNavbar from '../Navbar/BussinessNavbar';
import { Container, Stack, Typography, Box, Button } from '@mui/material';
import Footer from '../Footer/Footer';
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

const BussinessAddProduct = () => {
    const textFieldStyle = { width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }
    const siginupStyle = { background: "white", boxShadow: "none" };

    const [bussinessdetails, setBussinessdetails] = useState({});
    useEffect(() => {
        const bussinessdetails = localStorage.getItem("bussinessDetails");
        setBussinessdetails(JSON.parse(bussinessdetails));
    }, [])

    const [photoPreview, setPhotoPreview] = useState(null);

    const [error, setError] = useState({})

    const [data, setData] = useState({
        productName: "",
        productDescription: "",
        weight: "",
        adds: "", // Reverted to empty string
        price: "",
        stockavailable: "",
        discountPrice: "",
        specialOffer: "",
        category: "",
        photo: null,
    });
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setError((prevError) => ({
            ...prevError,
            [name]: ""
        }));

        setData(prev => {
            return { ...prev, [name]: value }
        })

    }

    const handlePhotoUpload = (e) => {

        setError((prevError) => {
            return { ...prevError, photo: "" }
        })
        const file = e.target.files[0];
        if (file) {
            setData(prev => {
                return { ...prev, photo: file }
            });
            const objectURL = URL.createObjectURL(file);
            setPhotoPreview(objectURL);
        }

    }

    const validation = () => {
        let isValid = true;
        let errorMessage = {};
        if (!data.productName.trim()) {
            errorMessage.productName = "productname should not be empty"
            isValid = false;
        }
        else if (data.productName.length < 3 || data.productName.length > 20) {
            errorMessage.productName = "productname should be 3 to 20 char length"
            isValid = false;

        }
        if (!data.productDescription.trim()) {
            errorMessage.productDescription = "product description should not be empty";
            isValid = false;
        }

        if (!data.weight) {
            errorMessage.weight = "weight should not be empty";
            isValid = false;
        }

        if (!data.adds.trim()) { // Reverted validation for text
            errorMessage.adds = "adds should not be empty";
            isValid = false;
        }

        if (!data.price) {
            errorMessage.price = "price should not be empty"
            isValid = false;
        }
        if (!data.stockavailable) {
            errorMessage.stockavailable = "stock available should not be empty"
            isValid = false;
        }

        if (!data.discountPrice) {
            errorMessage.discountPrice = "discount price should not be empty"
            isValid = false;
        }
        if (!data.specialOffer.trim()) {
            errorMessage.specialOffer = "special offer should not be empty"
            isValid = false;
        }
        if (!data.category.trim()) {
            errorMessage.category = "category should not be empty"
            isValid = false;
        }
        if (!data.photo) {
            errorMessage.photo = "photo should not be empty"
            isValid = false;
        }
        setError(errorMessage);
        return isValid;

    }


    const handleSubmit = async (e) => {
        const isValid = validation();
        if (!isValid) {
            return;
        }
        e.preventDefault();
        // console.log(data)
        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('productDescription', data.productDescription);
        formData.append('weight', data.weight);
        formData.append('adds', data.adds); // Reverted to text
        formData.append('price', data.price);
        formData.append('stockavailable', data.stockavailable);
        formData.append('discountPrice', data.discountPrice);
        formData.append('specialOffer', data.specialOffer);
        formData.append('category', data.category);
        formData.append('photo', data.photo);
        console.log(data);
        console.log(formData);
        const token = localStorage.getItem("token")


        const response = await axios.post(`${baseUrl}bussiness/addproduct`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });

        const result = response.data;
        console.log(result);
        console.log(result.message);


        console.log(data);

        if (result.message === "bussiness Product added successfully") {
            setData({
                productName: "",
                productDescription: "",
                weight: "",
                adds: "", // Reset to empty string
                price: "",
                stockavailable: "",
                discountPrice: "",
                specialOffer: "",
                category: "",
                photo: null,
            });
            setPhotoPreview(null);
            toast.success("Product added successfully");

        }


    }
    return (
        <>
            <BussinessNavbar bussinessdetails={bussinessdetails} />
            <Container sx={{ position: "relative", mb: "50px", siginupStyle }} maxWidth="x-lg">

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ mt: "100px" }}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ mb: "120px" }}>
                        <Typography variant='p' color='secondary' sx={{ fontSize: "32px" }}>Add Products</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center', alignItems: "start", gap: "30px", marginTop: '30px' }}>
                        <div style={textFieldStyle}>
                            <label>Product Name</label>
                            <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleDataChange}
                                name='productName'
                                value={data.productName}
                                type='text'

                            />
                            {error.productName && <span style={{ color: 'red', fontSize: '12px' }}>{error.productName}</span>}
                        </div>

                        <div style={textFieldStyle}>
                            <label>Product Description</label>
                            <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleDataChange}
                                name='productDescription'
                                value={data.productDescription}

                            />
                            {error.productDescription && <span style={{ color: 'red', fontSize: '12px' }}>{error.productDescription}</span>}
                        </div>

                        <div style={textFieldStyle}>
                            <label>Weight</label>
                            <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleDataChange}
                                name='weight'
                                value={data.weight}
                                type='number'
                            />
                            {error.weight && <span style={{ color: 'red', fontSize: '12px' }}>{error.weight}</span>}
                        </div>
                        <div style={textFieldStyle}>
                            <label>Photo</label>
                            <input style={{ display: "none" }}
                                type="file"
                                id="photo"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                            <label htmlFor="photo" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", height: "40px", borderRadius: "8px", border: "1px solid #CCCCCC", padding: '8px' }}>
                                <Button variant="contained" component="span" sx={{ background: "#E0E0E0", color: "#333", borderRadius: "5px", textTransform: "none", '&:hover': { background: "#D0D0D0" } }}>
                                    Upload Photo
                                </Button>
                                <span>{data.photo ? data.photo.name : "No File Chosen"}</span>
                            </label>
                            {error.photo && <span style={{ color: 'red', fontSize: '12px' }}>{error.photo}</span>}
                        </div>

                        <div style={textFieldStyle}>
                            <label>Price</label>
                            <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleDataChange}
                                name='price'
                                value={data.price}
                                type='number'
                            />

                            {error.price && <span style={{ color: 'red', fontSize: '12px' }}>{error.price}</span>}
                        </div>
                        <div style={textFieldStyle}>
                            <label>Discount price</label>
                            <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleDataChange}
                                name='discountPrice'
                                value={data.discountPrice}
                                type='number'

                            />
                            {error.discountPrice && <span style={{ color: 'red', fontSize: '12px' }}>{error.discountPrice}</span>}
                        </div>

                        <div style={textFieldStyle}>
                            <label>Stock Available</label>
                            <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleDataChange}
                                name='stockavailable'
                                value={data.stockavailable}
                                type='number'

                            />
                            {error.stockavailable && <span style={{ color: 'red', fontSize: '12px' }}>{error.stockavailable}</span>}
                        </div>
                        <div style={textFieldStyle}>
                            <label>Adds</label>
                            <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleDataChange}
                                name='adds'
                                value={data.adds}
                                type='text'
                            />
                            {error.adds && <span style={{ color: 'red', fontSize: '12px' }}>{error.adds}</span>}
                        </div>

                        <div style={textFieldStyle}>
                            <label>Special Offer</label>
                            <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleDataChange}
                                name='specialOffer'
                                value={data.specialOffer}
                                type='text'

                            />
                            {error.specialOffer && <span style={{ color: 'red', fontSize: '12px' }}>{error.specialOffer}</span>}
                        </div>
                        <div style={textFieldStyle}>
                            <label>Category</label>
                            <select style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleDataChange}
                                name='category'
                                value={data.category}
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home & Kitchen">Home & Kitchen</option>
                                <option value="Books">Books</option>
                                <option value="Sports">Sports</option>
                            </select>

                            {error.category && <span style={{ color: 'red', fontSize: '12px' }}>{error.category}</span>}

                        </div>
                    </Box>
                    {/*  */}
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ width: '253px', height: "93px", gap: '10px', mt: "100px" }}>
                        <Button variant='contained' sx={{ background: "#9B70D3", borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px', '&:hover': { background: "#8A60C3" } }}
                            onClick={handleSubmit}
                        >Add</Button>


                    </Box>
                </Box>
            </Container>
            <Footer />



        </>
    )
}

export default BussinessAddProduct
