"use client";

import { Trees, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export const ContactSection = () => {
    const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.success("Message sent successfully! We'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
    };

    return (
        <section className="py-24 border-t border-zinc-900 mt-20 bg-black">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* ── Left Side: Text ── */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-zinc-50 tracking-tight">
                                Get in <span className="text-green-600">Touch</span>
                            </h2>
                            <p className="text-zinc-400 text-lg max-w-md">
                                Have questions about environmental statistics in your district? Or want to report a plantation activity? We're here to help.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Email Us</p>
                                    <p className="text-zinc-300 font-medium tracking-tight">toqiabdullah61990@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                    <Phone size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Call Us</p>
                                    <p className="text-zinc-300 font-medium tracking-tight">+880 123 456 789</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                    <MapPin size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Head Office</p>
                                    <p className="text-zinc-300 font-medium tracking-tight">Ministry of Environment, Agargaon, Dhaka</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right Side: Form ── */}
                    <div className="p-10 rounded-[3rem] bg-zinc-950 border border-zinc-900 shadow-2xl shadow-zinc-500/5">
                        <form onSubmit={handleFormSubmission} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Your full name"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Your email address"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="How can we help you?"
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-sm resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-5 bg-zinc-50 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/10"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


