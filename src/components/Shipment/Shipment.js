import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const {register,handleSubmit,errors} = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
       <form className="ship-form" onSubmit={handleSubmit()}>
          <input name="name" defaultValue={loggedInUser.name} ref={register({required:true})} placeholder="Enter Your Name"/>
          {errors.name && <span className="error">Name is required</span>}

           <input name="email" defaultValue={loggedInUser.email} ref={register({required: true})} placeholder="Enter Your Email"/>
           {errors.email && <span className="error">Email is required</span>}

           <input name="address" ref={register({required: true})} placeholder="Enter your Address"/>
           {errors.address && <span className="error">Address is required</span>}

           <input name="phone" ref={register({required: true})} placeholder="Enter Your Phone"/>
           {errors.phone && <span className="error">Phone No. is required</span>}

           <input name="zip" ref={register({required: true})} placeholder="Enter Your Zip Code"/>
           {errors.zip && <span className="error">Zip is required</span>}

           <input type="submit" />
       </form>
    );
};

export default Shipment;