import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <div>
            {" "}
            <form onSubmit={handleSubmit}>
                <div>
                    username{" "}
                    <input
                        type="text"
                        data-testid="username"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password{" "}
                    <input
                        type="text"
                        data-testid="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePassowrdChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default LoginForm;
