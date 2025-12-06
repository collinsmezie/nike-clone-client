import { useState } from 'react';
import NikeLogo from '../components/NikeLogo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router';
import { useLogin } from '../hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useLogin();

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-between p-12">
                {/* Top: Logo */}
                <div>
                    <div className="bg-white p-3 rounded-xl inline-block">
                        <NikeLogo className="w-8 h-8 text-black" />
                    </div>
                </div>

                {/* Middle: Text */}
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">Just Do It</h1>
                    <p className="text-white-400 text-md max-w-md">
                        Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.
                    </p>

                    {/* Dots indicator */}
                    <div className="flex gap-1.5 mt-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
                    </div>
                </div>

                {/* Bottom: Copyright */}
                <p className="text-sm text-white-500">© 2024 Nike. All rights reserved.</p>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <NikeLogo className="w-12 h-12 text-black" />
                    </div>

                    <div className="text-center mb-4">
                        <span className="text-sm text-gray-600">Already have an account? </span>
                        <Link to="/signup" className="font-semibold underline">Sign Up</Link>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">Join Nike Today!</h2>
                        <p className="text-gray-600">Create your account to start your fitness journey</p>
                    </div>

                    {loginMutation.isError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                            {loginMutation.error?.message || 'Login failed. Please check your credentials.'}
                        </div>
                    )}

                    {/* Social Login Buttons */}
                    <div className="space-y-3 mb-6">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition bg-white text-black"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="font-medium">Continue with Google</span>
                        </button>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition bg-white text-black"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="black">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <span className="font-medium">Continue with Apple</span>
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or sign in with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-base font-normal leading-6 mb-2 font-sans">Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="johndoe@gmail.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black bg-white text-base font-normal leading-6 font-sans tracking-normal align-middle"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-base font-normal leading-6 mb-2 font-sans">Password</label>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="minimum 8 characters"
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black pr-12 bg-white text-base font-normal leading-6 font-sans tracking-normal align-middle"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                        </button>

                        <p className="text-xs text-gray-500 text-center">
                            By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
