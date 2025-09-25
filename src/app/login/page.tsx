'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Leaf } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const success = await signInWithEmailAndPassword(email, password);
      if (success) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-emerald-900/60 to-gray-900 opacity-50"></div>
        <div className="relative z-10 w-full max-w-md mx-4">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-center mb-8">
                    <Leaf className="h-8 w-8 text-emerald-400" />
                    <span className="ml-3 text-3xl font-bold">Evergreen</span>
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
                <p className="text-center text-gray-400 mb-8">Login to manage your sustainable events.</p>
                
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-base">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="m@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="bg-gray-900/50 border-gray-700 h-12 text-base focus:ring-emerald-400" 
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password"  className="text-base">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                             className="bg-gray-900/50 border-gray-700 h-12 text-base focus:ring-emerald-400"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                </div>

                <div className="mt-8">
                    <Button 
                        className="w-full h-12 text-base bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold shadow-lg shadow-emerald-500/20 transform hover:scale-105 transition-transform"
                        onClick={handleSignIn} 
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    <p className="mt-6 text-sm text-center text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-emerald-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}
