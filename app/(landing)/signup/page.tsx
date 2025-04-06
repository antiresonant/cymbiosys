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
	FormDescription,
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
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z
	.object({
		fullName: z.string().min(2, 'Full name must be at least 2 characters'),
		email: z.string().email('Please enter a valid email address'),
		location: z.string().min(2, 'Location must be at least 2 characters'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
			.regex(/[0-9]/, 'Password must contain at least one number'),
		confirmPassword: z.string(),
		termsAccepted: z.boolean().refine((val) => val === true, {
			message: 'You must accept the terms and conditions',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export default function SignupPage() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			email: '',
			location: '',
			password: '',
			confirmPassword: '',
			termsAccepted: false,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		setError(null);

		try {
			// In a real app, you would call your registration API here
			// const response = await register(values)

			// For demo purposes, we're just simulating a successful registration
			console.log('Registration attempt with:', values);

			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Redirect to dashboard or verification page
			router.push('/dashboard');
		} catch (err) {
			setError('Registration failed. Please try again.');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className='container mx-auto mt-18 flex items-center justify-center min-h-screen py-12 px-4'>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl font-bold'>
						Create an account
					</CardTitle>
					<CardDescription>
						Enter your information to sign up for Cymbiosys
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
								name='fullName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Jane Doe' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

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
								name='location'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input placeholder='City, Country' {...field} />
										</FormControl>
										<FormDescription>
											This helps us connect you with local conservation efforts
										</FormDescription>
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
												placeholder='Create a secure password'
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Must be at least 8 characters with uppercase, lowercase,
											and a number
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												placeholder='Confirm your password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='termsAccepted'
								render={({ field }) => (
									<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border'>
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className='space-y-1 leading-none'>
											<FormLabel>
												I accept the terms and conditions and privacy policy
											</FormLabel>
											<FormMessage />
										</div>
									</FormItem>
								)}
							/>

							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? 'Creating account...' : 'Create account'}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className='flex flex-col space-y-4'>
					<div className='text-center text-sm text-muted-foreground'>
						Already have an account?{' '}
						<Link href='/login' className='text-primary hover:underline'>
							Log in
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
						<Button variant='outline' className='w-full'>
							<svg
								className='mr-2 h-4 w-4'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z'></path>
							</svg>
							Google
						</Button>
						<Button variant='outline' className='w-full'>
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
