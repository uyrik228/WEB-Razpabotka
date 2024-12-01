import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {jwtDecode} from 'jwt-decode';

const ReviewTable = ({ isAdmin, delReview }) => {
  const [reviews, setReviews] = useState([]);
  const [viewMode, setViewMode] = useState('all'); // 'all' или 'my'
  const theme = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // Если токена нет, выходим
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub; // Предполагается, что идентификатор пользователя хранится в поле 'sub'

      try {
        let response;
        if (viewMode === 'my') {
          const userResponse = await axios.get(`http://localhost:8081/api/Users/name/${username}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const userId = userResponse.data.id;
          response = await axios.get(`http://localhost:8081/api/Reviews/UserReviews/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } else {
          response = await axios.get('http://localhost:8081/api/Reviews', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
        console.log("Полученные данные:", response.data); // Для отладки
        setReviews(response.data);

      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Если отзывов нет, устанавливаем пустой массив
          setReviews([]);
        } else {
          console.error("Ошибка при получении данных:", error);
        }
      }
    };

    fetchReviews();
  }, [viewMode]); // Добавьте viewMode в зависимости

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8081/api/Reviews/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      delReview(id); // Вызов функции удаления из родительского компонента
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
    }
  };

  const handleViewChange = (event, newView) => {
    if (newView) {
      setViewMode(newView);
      console.log("Текущий режим просмотра:", newView);
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleViewChange}
        aria-label="view mode"
        style={{ marginBottom: '16px' }}
      >
        <ToggleButton value="all" aria-label="all reviews">
          Все отзывы
        </ToggleButton>
        <ToggleButton value="my" aria-label="my reviews">
          Мои отзывы
        </ToggleButton>
      </ToggleButtonGroup>

      <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.paper }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Рейтинг</TableCell>
              <TableCell>Продукт</TableCell>
              <TableCell>Пользователь</TableCell>
              {isAdmin && (
                <>
                  <TableCell>Удалить</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>{review.date}</ TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.product.name}</TableCell>
                  <TableCell>{review.user.username}</TableCell>
                  {isAdmin && (
                    <>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => handleDelete(review.id)}>
                          Удалить
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isAdmin ? 8 : 6} align="center">
                  <Typography variant="h6" color="textSecondary">
                    У вас нет никаких отзывов
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReviewTable;