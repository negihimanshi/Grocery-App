import React, { useState} from 'react';
import {FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Input = ({value, onChange, placeholder, label, type, selectOptions }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggelShowPassword = () =>{
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <label className=''>{label}</label>

      {selectOptions ? (
        <select 
          value={value}
          onChange={(e) => onChange(e)}
          className="input-box"
        >
          <option value="" disabled>Select {label}</option>
          {selectOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
      <div className='input-box'>
        <input
          type = {type == 'password' ? showPassword ? 'text' : 'password' : type}
          placeholder= {placeholder}
          className=''
          value={value}
          onChange={(e) => onChange(e)}
        />
        { type == 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className='text-primary cursor-pointer'
                onClick={()=> toggelShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className='text-slate-400 cursor-pointer'
                onClick={()=>toggelShowPassword()}
              />
            )}
          </>
        )}
      </div>
    )}
    </div>
  )
}

export default Input