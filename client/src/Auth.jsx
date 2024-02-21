import { useState } from "react";
import Dailog from "./components/Dailog";
import request from "./components/request";

export default function Auth() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [register, setRegister] = useState({ username: "", password: "" });
  const [showRegisterd, setShowRegistered] = useState(false);

  // handle login
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const { data } = await request("/api/auth/login", {
        method: "POST",
        data: { username: login.username, password: login.password },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // handle register
  const handleRegister = async e => {
    e.preventDefault();
    try {
      await request("/api/auth/register", {
        method: "POST",
        data: { username: register.username, password: register.password },
      });
      setShowRegistered(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div style={{ background: "#4DD0E1" }}>
          <div className="d-flex justify-content-center align-items-center vh-100">
            {/* auth - main */}
            <main className="bg-light p-3 rounded-4 w-75">
              {/* title */}
              <h5 className="fw-bold mt-2">Login to my todos</h5>
              <hr className="border-dark border-2" />

              {/* Login Form */}
              <form>
                <div>
                  <input
                    type="text"
                    className="form-control form-control-lg border-2 rounded-4 customInput"
                    id="login-username"
                    name="login-username"
                    placeholder="Username"
                    value={login.username}
                    onChange={e =>
                      setLogin({ ...login, username: e.target.value })
                    }
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3 mt-3">
                  <input
                    type="password"
                    className="form-control form-control-lg border-2 rounded-4 customInput"
                    id="login-password"
                    name="login-password"
                    placeholder="Password"
                    value={login.password}
                    onChange={e =>
                      setLogin({ ...login, password: e.target.value })
                    }
                    autoComplete="off"
                  />
                  <style>
                    {`
                .customInput {
                  transition: border-color 0.4s ease-in-out;

                }
                .customInput:hover {
                  border-color: #74E291;
                } 
                `}
                  </style>
                </div>
                <div>
                  <button className="btn btn-dark d-block mx-auto mt w-50 p-2">
                    Login
                  </button>
                </div>
              </form>

              <hr className="border-dark border-2 mt-5" />
              {/* Register Form */}
              <form onSubmit={handleRegister} className="mt-5">
                <h5 className="fw-bold mt-2 mb-4">Register to my todos</h5>
                <div>
                  <input
                    type="text"
                    className="form-control form-control-lg border-2 rounded-4 customInput"
                    id="register-username"
                    name="register-username"
                    placeholder="Username"
                    value={register.username}
                    onChange={e =>
                      setRegister({ ...register, username: e.target.value })
                    }
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3 mt-3">
                  <input
                    type="password"
                    className="form-control form-control-lg border-2 rounded-4 customInput"
                    id="register-password"
                    name="register-password"
                    placeholder="Password"
                    value={register.password}
                    onChange={e =>
                      setRegister({ ...register, password: e.target.value })
                    }
                    autoComplete="off"
                  />
                  <style>
                    {`
                .customInput {
                  transition: border-color 0.4s ease-in-out;

                }
                .customInput:hover {
                  border-color: #74E291;
                } 
                `}
                  </style>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn btn-dark d-block mx-auto mt w-50 p-2"
                  >
                    Register
                  </button>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>

      {/* Delete Collection */}
      <Dailog
        show={showRegisterd}
        onClose={() => setShowRegistered(false)}
        header="Registered successfully"
        body="Registered successfully,you can login now"
      />
    </>
  );
}
