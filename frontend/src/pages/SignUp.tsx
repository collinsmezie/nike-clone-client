import { useForm } from 'react-hook-form';
import NikeLogo from '../components/NikeLogo';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router';
import { useRegister } from '../hooks/useAuth';

const registerSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const registerMutation = useRegister();

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-nike-black text-white flex-col justify-between p-12">
                <div>
                    <NikeLogo className="w-16 h-16 mb-8 text-current" />
                    <h1 className="text-6xl font-bold mb-4">Just Do It</h1>
                    <p className="text-gray-400 text-lg">
                        Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.
                    </p>
                </div>
                <p className="text-sm text-gray-500">© 2024 Nike. All rights reserved.</p>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-right mb-4">
                        <span className="text-sm text-gray-600">Already have an account? </span>
                        <Link to="/signin" className="font-semibold underline">Sign In</Link>
                    </div>

                    <h2 className="text-3xl font-bold mb-2">Join Nike Today!</h2>
                    <p className="text-gray-600 mb-8">Create your account to start your fitness journey</p>

                    {registerMutation.isError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                            {registerMutation.error?.message || 'Registration failed. Please try again.'}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                                {...register('fullName')}
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="johndoe@gmail.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="minimum 8 characters"
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {registerMutation.isPending ? 'Creating Account...' : 'Sign Up'}
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
