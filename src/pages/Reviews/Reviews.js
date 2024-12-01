import React, { useState } from "react";
import Form from "./components/Form";
import ReviewTable from "./components/ReviewTable";
import ReviewAPI from "../../api/service";

const initialReviews = ReviewAPI.all();

const Reviews = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const initialReview = { comment: '', date: '', rating: '', product_id: '', user_id: '' };

    const handleSubmit = (newReview) => {
        setReviews([...reviews, { ...newReview, id: reviews.length }]);
    };

    const delReview = (id) => {
        setReviews(reviews.filter(review => review.id !== id));
    };

    
    // Проверка роли пользователя
    const isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
    console.log('Is Admin:', isAdmin); // Логирование для отладки

    return (
        <div>
            <Form handleSubmit={handleSubmit} />
            <ReviewTable reviews={reviews} delReview={delReview} isAdmin={isAdmin} />
        </div>
    );
};

export default Reviews;
