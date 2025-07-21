import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

    const validations = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passwordsMatch = password === confirmPassword && confirmPassword !== '';
  const allValidationsPassed = Object.values(validations).every(Boolean) && passwordsMatch && email !== '';


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        email,
        password,
      });
      router.push('/login');
    } catch (err: any) {
      console.error(err);
      alert('Registration failed: this email might already exist.');
    }
  };

  useEffect(() => {
    setIsFormValid(allValidationsPassed);
  }, [allValidationsPassed]);

    const ValidationIcon = ({ isValid }) => (
    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
      {isValid ? (
        <TaskAltIcon className="text-green-500 text-xl" />
      ) : (
        <RemoveCircleOutlineIcon className="text-red-500 text-xl" />
      )}
    </span>
  );
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 p-3 rounded-md w-80 bg-white pb-10">
        <h2 className="text-xl font-bold text-center py-7">Create an Account</h2>
         <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </div>
         <div className="mb-2">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input
          className={`border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            showValidation ? 
              (Object.values(validations).every(Boolean) ? 'border-gray-300' : 'border-red-500') 
              : 'border-gray-300'
          }`}            
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setShowValidation(true)}
          required
          />
            {showValidation && (
            <div className="text-sm mt-3">
              <p className="font-medium text-gray-500 mb-2">Password must contain at least:</p>
              
              <div>
                <div className="flex items-center gap-2">
                  <ValidationIcon isValid={validations.minLength} />
                  <span className="text-gray-500">
                    8 characters
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <ValidationIcon isValid={validations.hasUppercase} />
                  <span className="text-gray-500">
                    One uppercase letter
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <ValidationIcon isValid={validations.hasLowercase} />
                  <span className="text-gray-500">
                    One lowercase letter
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <ValidationIcon isValid={validations.hasNumber} />
                  <span className="text-gray-500">
                    One number
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <ValidationIcon isValid={validations.hasSymbol} />
                  <span className="text-gray-500">
                    One symbol
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
          <input
          className={`border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              confirmPassword !== '' ? 
                (passwordsMatch ? 'border-gray-300' : 'border-red-500') 
                : 'border-gray-300'
            }`}          
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
        </div>
             
        <button disabled={!isFormValid} 
        className={`text-white p-3 rounded-lg font-medium transition-all ${
            isFormValid 
              ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
              : 'bg-blue-400 cursor-not-allowed'
          }`}>
          Create an Account</button>
          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">Already have an account? <a href="/login" className="font-medium text-blue-600 hover:underline">Login here</a>.</p>

      </form>
    </div>
  );
}