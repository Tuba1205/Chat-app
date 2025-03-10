import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';
import useSignup from '../../hooks/useSignup';
   

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });

    const handleCheckboxChange = (gender) => {
        setInputs({...inputs, gender});
    };
   const {loading, signup} = useSignup();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);        
    };
        return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'> SignUp User </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>FullName</span>
                        </label>
                        <input type="text" placeholder="John Doe" className='w-full input input-bordered h-10'
                        value = {inputs.fullName}
                        onChange = {(e) => setInputs({...inputs, fullName: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type="text" placeholder="johndoe12" className='w-full input input-bordered h-10'
                        value={inputs.username}
                        onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type="password" placeholder="Enter Your Password" className='w-full input input-bordered h-10'
                        value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Enter Your Confirm Password" className='w-full input input-bordered h-10'
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                        />
                    </div>
                    <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender}/>

                    <Link to="/Login" className='text-sm hover:underline hover:text-white mt-2 inline-block'>
                        Already have an account?
                    </Link>
                    <div>
                        <button className="btn btn-sm btn-block mt-2 border border-slate-200" 
                            disabled = {loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "SignUp"}
                             </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;



// starter code for signup
// import React from 'react'

// const SignUp = () => {
//     return (
//         <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//             <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//                 <h1 className='text-3xl font-semibold text-center text-gray-300'> SignUp User </h1>

//                 <form>
//                     <div>
//                         <label className='label p-2'>
//                             <span className='text-base label-text'>FullName</span>
//                         </label>
//                         <input type="text" placeholder="John Doe" className='w-full input input-bordered h-10' />
//                     </div>

//                     <div>
//                         <label className='label p-2'>
//                             <span className='text-base label-text'>Username</span>
//                         </label>
//                         <input type="text" placeholder="johndoe12" className='w-full input input-bordered h-10' />
//                     </div>

//                     <div>
//                         <label className='label p-2'>
//                             <span className='text-base label-text'>Password</span>
//                         </label>
//                         <input type="password" placeholder="Enter Your Password" className='w-full input input-bordered h-10' />
//                     </div>

//                     <div>
//                         <label className='label p-2'>
//                             <span className='text-base label-text'>Confirm Password</span>
//                         </label>
//                         <input type="password" placeholder="Enter Your Confirm Password" className='w-full input input-bordered h-10' />
//                     </div>
//                     <div className='flex'>
//                         <div className="form-control">
//                             <label className={'label  gap-2 cursor-pointer'}>
//                                 <span className="label-text">Male</span>
//                                 <input type="checkbox" className="checkbox border-slate-900" />
//                             </label>
//                         </div>
//                         <div className="form-control">
//                             <label className={'label  gap-2 cursor-pointer'}>
//                                 <span className="label-text">Female</span>
//                                 <input type="checkbox" className="checkbox border-slate-900" />
//                             </label>
//                         </div>
//                     </div>

//                     <a href="#" className='text-sm hover:underline hover:text-white mt-2 inline-block'>
//                         Already have an account?
//                     </a>
//                     <div>
//                         <button className="btn btn-sm btn-block mt-2"> SignUp </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SignUp;


