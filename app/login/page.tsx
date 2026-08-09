'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-brutal-grid flex flex-col">
      <header className="border-b-[3px] border-black bg-[#c8ff00] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black flex items-center justify-center shadow-[3px_3px_0_0_#fff]">
              <span className="text-yellow-300 font-bold text-xl leading-none">T</span>
            </div>
            <div className="leading-none">
              <h1 className="text-2xl font-bold text-black tracking-tight uppercase">
                TypeWithMe
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-black/70">
                KEYBOARD ACCELERATOR
              </p>
            </div>
          </Link>
          <Button asChild variant="secondary" size="sm" className="bg-[#c8ff00]">
            <Link href="/test">Start Typing</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white border-2 border-black brutal-shadow p-8 animate-pop">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/60">
              {'// AUTH PORTAL [01]'}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest bg-black text-yellow-300 border-2 border-black px-2 py-0.5">
              strict mode
            </span>
          </div>

          <h2 className="text-4xl font-bold uppercase tracking-tight leading-none">
            Welcome
            <span className="bg-yellow-300 border-2 border-black brutal-shadow px-2 mx-1 inline-block -rotate-1">
              back
            </span>
          </h2>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-black/70">
            Pick up where the caret left off.
          </p>

          <div className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase tracking-widest text-black/80">
                {'> '}user / email
              </Label>
              <Input
                type="text"
                placeholder="[your handle]"
                className="h-12 rounded-none border-2 border-black bg-white font-mono text-sm tracking-widest placeholder:font-mono placeholder:text-xs placeholder:uppercase placeholder:tracking-widest placeholder:text-black/30 focus-visible:border-black focus-visible:ring-black focus-visible:ring-[3px] focus-visible:shadow-[4px_4px_0_0_#ffd400]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-mono text-xs uppercase tracking-widest text-black/80">
                  {'> '}password
                </Label>
                <Link
                  href="#"
                  className="font-mono text-[10px] uppercase tracking-widest text-black/50 underline decoration-2 underline-offset-2 hover:text-black"
                >
                  lost?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="[********]"
                  className="h-12 rounded-none border-2 border-black bg-white pr-12 font-mono text-sm tracking-widest placeholder:font-mono placeholder:text-black/30 focus-visible:border-black focus-visible:ring-black focus-visible:ring-[3px] focus-visible:shadow-[4px_4px_0_0_#ffd400]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center border-2 border-black bg-white hover:bg-yellow-300 transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="button"
              size="lg"
              className="w-full h-12 bg-black text-[#c8ff00] text-sm shadow-[4px_4px_0_0_#ffd400] hover:bg-black/85"
            >
              Login →
            </Button>

            <p className="text-center font-mono text-[10px] uppercase tracking-widest text-black/50">
              [ keep hands on home row ] • [ caps lock: off ]
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="h-[2px] flex-1 bg-black/15" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">
                or
              </span>
              <span className="h-[2px] flex-1 bg-black/15" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 bg-white hover:bg-black hover:text-white"
            >
              Sign in with GitHub
            </Button>
          </div>

          <div className="mt-8 border-t-2 border-black pt-4 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-black/70">
              New around here?
            </p>
            <Link
              href="/signup"
              className="mt-2 inline-block font-bold uppercase tracking-wide underline decoration-2 underline-offset-4 hover:bg-yellow-300"
            >
              Create an account →
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t-[3px] border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/60">
            TYPEWITHME © 2026 — BUILT WITH BLOOD, SWEAT &amp; BRUTALISM
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/60">
            wpm &gt; life
          </p>
        </div>
      </footer>
    </div>
  );
}