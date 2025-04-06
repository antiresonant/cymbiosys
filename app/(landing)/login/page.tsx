'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		setError(null);

		try {
			// In a real app, you would call your authentication API here
			// const response = await signIn(values.email, values.password)

			// For demo purposes, we're just simulating a successful login
			console.log('Login attempt with:', values);

			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Redirect to dashboard on success
			router.push('/dashboard');
		} catch (err) {
			setError('Invalid email or password. Please try again.');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className='container mx-auto mt-8 flex items-center justify-center min-h-screen py-12 px-4'>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl font-bold'>Welcome back</CardTitle>
					<CardDescription>
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					{error && (
						<Alert variant='destructive' className='mb-4'>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder='your.email@example.com' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												placeholder='••••••••'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex items-center justify-between'>
								<Link
									href='/forgot-password'
									className='text-sm text-primary hover:underline'
								>
									Forgot password?
								</Link>
							</div>

							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? 'Signing in...' : 'Sign in'}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className='flex flex-col space-y-4'>
					<div className='text-center text-sm text-muted-foreground'>
						Don&apos;t have an account?{' '}
						<Link href='/signup' className='text-primary hover:underline'>
							Sign up
						</Link>
					</div>

					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<span className='w-full border-t' />
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-background px-2 text-muted-foreground'>
								Or continue with
							</span>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<Button variant='outline' className='w-full cursor-pointer'>
							<svg
								className='mr-2 h-4 w-4'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z'></path>
							</svg>
							Google
						</Button>
						<Button variant='outline' className='w-full cursor-pointer'>
							<svg
								className='mr-2 h-4 w-4'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z'></path>
							</svg>
							Apple
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
