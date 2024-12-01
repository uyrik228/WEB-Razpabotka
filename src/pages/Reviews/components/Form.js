import React, { useState, useEffect } from "react";
import axios from 'axios';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import {jwtDecode} from 'jwt-decode';

const ReviewForm = ({ handleSubmit }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/Products', {
            headers: {
            'Authorization': `Bearer ${token}`
          }});
        setProducts(response.data);
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (!token) {
        console.error('Пользователь не авторизован');
        return;
      }

      const username = jwtDecode(token).sub;
      const userResponse = await axios.get(`http://localhost:8081/api/Users/name/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const productResponse = await axios.get(`http://localhost:8081/api/Products/${selectedProduct}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const reviewData = {
        product: productResponse.data,
        user: userResponse.data,
        comment: comment,
        rating: rating,
        date: new Date().toISOString(),
      };
      console.log(reviewData);

      const response = await axios.post('http://localhost:8081/api/Reviews/create', reviewData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Отзыв добавлен:', response.data);
      handleSubmit(response.data);

      setSelectedProduct('');
      setComment('');
      setRating(1);
    } catch (error) {
      console.error('Ошибка при добавлении отзыва:', error);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ marginTop: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined" size="small" required>
            <InputLabel>Продукт</InputLabel>
            <Select
              value={selectedProduct}
              onChange={handleProductChange}
              label="Продукт"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Комментарий"
            type="text"
            value={comment}
            onChange={handleCommentChange}
            required
            variant="outlined"
            size="small"
            multiline
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Рейтинг (1-10)"
            type="number"
            value={rating}
            onChange={handleRatingChange}
            required
            //variant="outlined"
            size="small"
            inputProps={{ min: 1, max: 10 }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Добавить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewForm;