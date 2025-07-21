import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      email,
      password,
    });
    localStorage.setItem('token', res.data.token);
    router.push('/dashboard');
  } catch (err) {
    console.error(err);
    alert('Login failed: Check your email and password.');  
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-3 rounded-md w-80 bg-white pb-10">
        <h2 className="text-xl font-bold">Login in to your account</h2>
        <div className="mb-2">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className="mb-2">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button className="bg-blue-600 text-white p-2 rounded">Sign in</button>
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">Don't have an account? <a href="/register" className="font-medium text-blue-600 hover:underline">Sign Up</a>.</p>
      </form>
    </div>
  );
}