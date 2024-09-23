import React from "react";
import { Link } from "react-router-dom";

const ViewUsers = ({ users }) => {
    return (
        <div>
            {" "}
            <h2>users</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>users</th>
                            <th>blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>
                                        <Link to={`/users/${user.id}`}>
                                            {user.username}
                                        </Link>
                                    </td>
                                    <td>{user.blogs.length}</td>
                                    <td>{user.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewUsers;
