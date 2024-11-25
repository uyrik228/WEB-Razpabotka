import React, { useState } from "react";
// import Form from "./components/Form";
import UsersTable from "./components/UsersTable";
import UsersAPI from "../../api/service";

const initialUsers = UsersAPI.all();

const Users = () => {
    const [users, setUsers] = useState(initialUsers);
    const initialUser = { username: '', email: ''};

    const handleSubmit = (newUser) => {
        setUsers([...users, { ...newUser, id: users.length }]);
    };

    const delUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    
    // Проверка роли пользователя
    const isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
    console.log('Is Admin:', isAdmin); // Логирование для отладки

    return (
        <div>
            {/* {isAdmin && <Form handleSubmit={handleSubmit} initialProduct={initialProduct} />} */}
            <UsersTable users={users} delUser={delUser} isAdmin={isAdmin} />
        </div>
    );
};

export default Users;
