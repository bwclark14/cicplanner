import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSignup(e: any) {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/auth/signup`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    router.push('/dashboard');
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold">Sign up</h2>
      <form onSubmit={handleSignup} className="mt-4 space-y-3 bg-white p-4 rounded shadow">
        <label className="block">
          <div className="text-sm">Email</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 border rounded w-full" />
        </label>
        <label className="block">
          <div className="text-sm">Password</div>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 p-2 border rounded w-full" />
        </label>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create account</button>
      </form>
    </div>
  );
}