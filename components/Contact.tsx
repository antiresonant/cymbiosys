'use client';

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Mail, Phone, MessageSquare } from 'lucide-react';

const formSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	message: z.string().min(10, 'Message must be at least 10 characters'),
});

export function Contact() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			message: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);

		try {
			// In a real app, you would send the form data to your API
			console.log('Form submitted:', values);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Show success message
			setIsSuccess(true);
			form.reset();

			// Hide success message after 5 seconds
			setTimeout(() => setIsSuccess(false), 5000);
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section id='contact' className='py-16 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-4'>
						Get in Touch
					</h2>
					<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
						Have questions about our conservation technologies? We'd love to
						hear from you.
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8 items-stretch'>
					{/* Contact Form */}
					<Card className='border-border/40 bg-background/60 backdrop-blur-sm h-full'>
						<CardHeader>
							<CardTitle>Send us a message</CardTitle>
						</CardHeader>
						<CardContent>
							{isSuccess ? (
								<div className='bg-primary/10 text-primary p-4 rounded-md mb-4'>
									<p className='font-medium'>Message sent successfully!</p>
									<p className='text-sm mt-1'>
										We'll get back to you as soon as possible.
									</p>
								</div>
							) : null}

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className='space-y-6'
								>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input placeholder='Your name' {...field} />
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
													<Input
														placeholder='your.email@example.com'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='message'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Message</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Tell us about your conservation project or questions...'
														className='min-h-[120px]'
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Share details about your wildlife conservation needs
													or questions about our technology.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										type='submit'
										className='w-full'
										disabled={isSubmitting}
									>
										{isSubmitting ? 'Sending...' : 'Send Message'}
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card className='border-border/40 bg-background/60 backdrop-blur-sm h-full flex flex-col'>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent className='flex-grow'>
							<div className='space-y-8'>
								<div className='flex items-start'>
									<MapPin className='h-5 w-5 text-primary mr-3 mt-0.5' />
									<div>
										<p className='font-medium'>Our Location</p>
										<address className='not-italic text-muted-foreground'>
											123 Conservation Way
											<br />
											Eco Park, Wildlife Region
											<br />
											EarthSave, 10101
										</address>
									</div>
								</div>

								<div className='flex items-start'>
									<Mail className='h-5 w-5 text-primary mr-3 mt-0.5' />
									<div>
										<p className='font-medium'>Email Us</p>
										<a
											href='mailto:info@cymbiosys.com'
											className='text-muted-foreground hover:text-primary transition-colors'
										>
											info@cymbiosys.com
										</a>
									</div>
								</div>

								<div className='flex items-start'>
									<Phone className='h-5 w-5 text-primary mr-3 mt-0.5' />
									<div>
										<p className='font-medium'>Call Us</p>
										<a
											href='tel:+15551234567'
											className='text-muted-foreground hover:text-primary transition-colors'
										>
											+1 (555) 123-4567
										</a>
									</div>
								</div>

								<div className='mt-8 pt-8 border-t'>
									<h4 className='font-semibold mb-4'>Operating Hours</h4>
									<div className='grid grid-cols-2 gap-2 text-sm'>
										<div>Monday - Friday</div>
										<div className='text-right'>9:00 AM - 6:00 PM</div>
										<div>Saturday</div>
										<div className='text-right'>10:00 AM - 4:00 PM</div>
										<div>Sunday</div>
										<div className='text-right'>Closed</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
