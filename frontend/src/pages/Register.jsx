import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const { name, email, password, password_confirm } = formData;

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = e => {
    e.preventDefault();
    //TODO: basic frontend validation

    if (password !== password_confirm) {
      toast.error("Passwords do not match");
    }
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password_confirm"
              name="password_confirm"
              value={password_confirm}
              onChange={onChange}
              placeholder="Confirm Password"
            />
          </div>
          <div className="form-control">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
