"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import React from "react";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
      localStorage.setItem("isLoggedIn", "true");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-zinc-50 selection:bg-amber-500/30">
      
      {/* Ambient Background Glows */}
      <div className="absolute -top-[25%] -left-[10%] h-[70%] w-[50%] rounded-full bg-amber-500/20 blur-[120px] dark:bg-amber-600/10" />
      <div className="absolute bottom-[0%] right-[0%] h-[60%] w-[40%] rounded-full bg-orange-500/20 blur-[120px] dark:bg-orange-600/10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        
        {/* Main Floating Container */}
        <div className="flex w-full max-w-[1000px] flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white/60 shadow-2xl backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 lg:flex-row">
          
          {/* Left Side: Art & Branding */}
          <div className="relative hidden w-1/2 flex-col justify-between border-r border-slate-200/60 bg-slate-100/40 p-12 transition-colors duration-500 dark:border-white/10 dark:bg-zinc-900/30 lg:flex">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-black shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold tracking-wide">Acme Studio</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-light leading-tight tracking-tight text-slate-900 dark:text-white">
                Crafting digital <br />
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-200 dark:to-amber-500">
                  masterpieces.
                </span>
              </h2>
              <p className="max-w-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                Log in to access your bespoke dashboard, manage ongoing projects, and refine your vision with our premium toolset.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-zinc-500">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 dark:border-zinc-900 dark:bg-zinc-800" />
                ))}
              </div>
              <p>Trusted by 10k+ creators</p>
            </div>
          </div>

          {/* Right Side: Interactive Forms */}
          <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-1/2">
            
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-black shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold tracking-wide">Acme Studio</span>
            </div>

            <div className="mx-auto w-full max-w-sm">
              <Tabs defaultValue="login" className="w-full">
                
                {/* Custom Elegant Tabs */}
                <TabsList className="mb-8 grid w-full grid-cols-2 rounded-full border border-slate-200/60 bg-slate-200/50 p-1 transition-colors duration-500 dark:border-white/5 dark:bg-zinc-900/50">
                  <TabsTrigger 
                    value="login" 
                    className="rounded-full transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-white"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="rounded-full transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-white"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>

                {/* LOGIN CONTENT */}
                <TabsContent value="login" className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                  <div className="mb-6">
                    <h3 className="text-2xl font-medium tracking-tight text-slate-900 dark:text-white">Welcome back</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Enter your credentials to continue.</p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 dark:text-zinc-300">Email Address</Label>
                      <Input
                        id="email"
                        placeholder="hello@example.com"
                        type="email"
                        required
                        disabled={isLoading}
                        className="h-12 rounded-xl border-slate-200 bg-white/50 text-slate-900 transition-all placeholder:text-slate-400 focus-visible:border-amber-500/50 focus-visible:ring-amber-500/50 dark:border-white/10 dark:bg-zinc-900/50 dark:text-white dark:placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-slate-700 dark:text-zinc-300">Password</Label>
                        <a href="#" className="text-xs font-medium text-amber-600 transition-colors hover:text-amber-500 dark:text-amber-500 dark:hover:text-amber-400">
                          Recover password
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                        className="h-12 rounded-xl border-slate-200 bg-white/50 text-slate-900 transition-all placeholder:text-slate-400 focus-visible:border-amber-500/50 focus-visible:ring-amber-500/50 dark:border-white/10 dark:bg-zinc-900/50 dark:text-white dark:placeholder:text-zinc-600"
                      />
                    </div>
                    <Button 
                      className="group h-12 w-full rounded-xl bg-slate-900 font-medium text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" 
                      type="submit" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Mail className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* SIGNUP CONTENT */}
                <TabsContent value="signup" className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                  <div className="mb-6">
                    <h3 className="text-2xl font-medium tracking-tight text-slate-900 dark:text-white">Create an account</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Start crafting your vision today.</p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-slate-700 dark:text-zinc-300">Email Address</Label>
                      <Input
                        id="signup-email"
                        placeholder="hello@example.com"
                        type="email"
                        required
                        disabled={isLoading}
                        className="h-12 rounded-xl border-slate-200 bg-white/50 text-slate-900 transition-all placeholder:text-slate-400 focus-visible:border-amber-500/50 focus-visible:ring-amber-500/50 dark:border-white/10 dark:bg-zinc-900/50 dark:text-white dark:placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-slate-700 dark:text-zinc-300">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a strong password"
                        required
                        disabled={isLoading}
                        className="h-12 rounded-xl border-slate-200 bg-white/50 text-slate-900 transition-all placeholder:text-slate-400 focus-visible:border-amber-500/50 focus-visible:ring-amber-500/50 dark:border-white/10 dark:bg-zinc-900/50 dark:text-white dark:placeholder:text-zinc-600"
                      />
                    </div>
                    <Button 
                      className="group h-12 w-full rounded-xl border-none bg-gradient-to-r from-amber-500 to-orange-600 font-medium text-white shadow-lg shadow-amber-900/20 transition-all hover:opacity-90" 
                      type="submit" 
                      disabled={isLoading}
                    >
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                </TabsContent>

                {/* Shared Social Logins */}
                <div className="mt-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200 dark:border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                      <span className="bg-slate-50 px-3 text-slate-500 backdrop-blur-sm dark:bg-zinc-950/50 dark:text-zinc-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" type="button" disabled={isLoading} className="h-11 rounded-xl border-slate-200 bg-white/50 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-zinc-900/30 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white">
                      <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" type="button" disabled={isLoading} className="h-11 rounded-xl border-slate-200 bg-white/50 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-zinc-900/30 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white">
                      <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>

              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}