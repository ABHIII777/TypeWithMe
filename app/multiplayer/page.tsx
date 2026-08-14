'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, DoorOpen, X } from 'lucide-react';

const inputClassName =
    'h-12 rounded-none border-2 border-black bg-white font-mono text-sm tracking-widest placeholder:font-mono placeholder:text-xs placeholder:uppercase placeholder:tracking-widest placeholder:text-black/30 focus-visible:border-black focus-visible:ring-black focus-visible:ring-[3px] focus-visible:shadow-[4px_4px_0_0_#ffd400]';

export default function MultiplayerScreen() {
    const [displayName, setDisplayName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [showRoomCodeWindow, setShowRoomCodeWindow] = useState(false);
    const [codeCopied, setCodeCopied] = useState(false);
    const createdRoomCode = 'ABC123';

    return (
        <>
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
                            <Link href="/test">Practice Solo</Link>
                        </Button>
                    </div>
                </header>

                <main className="flex-1 flex items-center justify-center px-4 py-16">
                    <div className="w-full max-w-2xl bg-white border-2 border-black brutal-shadow p-8 animate-pop">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-black/60">
                                {'// MULTIPLAYER PORTAL [01]'}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest bg-black text-yellow-300 border-2 border-black px-2 py-0.5">
                                do not cheat
                            </span>
                        </div>

                        <h2 className="text-4xl font-bold uppercase tracking-tight leading-none sm:text-5xl">
                            Race
                            <span className="bg-yellow-300 border-2 border-black brutal-shadow px-2 mx-1 inline-block -rotate-1">
                                your
                            </span>
                            friends
                        </h2>
                        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-black/70">
                            Strap in. This is going to be a bumpy ride.
                        </p>

                        <div className="mt-8 space-y-5">
                            <div className="space-y-2">
                                <Label className="font-mono text-xs uppercase tracking-widest text-black/80">
                                    {'> '}callsign
                                </Label>
                                <Input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="[what do we call you]"
                                    className={inputClassName}
                                    maxLength={30}
                                />
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="flex flex-col border-2 border-black bg-[#c8ff00] brutal-shadow p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Users className="size-5" />
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-black/70">
                                            host the party
                                        </span>
                                    </div>
                                    <h3 className="font-bold uppercase tracking-tight leading-none text-xl">
                                        Create room
                                    </h3>
                                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-black/70 flex-1">
                                        Get a room code. Your friends use it to join your race.
                                    </p>
                                    <Button
                                        type="button"
                                        size="lg"
                                        className="mt-4 w-full h-12 bg-black text-[#c8ff00] text-sm shadow-[4px_4px_0_0_#fff] hover:bg-black/85"
                                        onClick={() => setShowRoomCodeWindow(true)}
                                    >
                                        Create →
                                    </Button>
                                </div>

                                <div className="flex flex-col border-2 border-black bg-[#e0f7ff] brutal-shadow p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <DoorOpen className="size-5" />
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-black/70">
                                            join the party
                                        </span>
                                    </div>
                                    <h3 className="font-bold uppercase tracking-tight leading-none text-xl">
                                        Join room
                                    </h3>
                                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-black/70 flex-1">
                                        Friend got a code? Punch it in and get racing.
                                    </p>
                                    <Input
                                        type="text"
                                        value={roomCode}
                                        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                        placeholder="[ROOM CODE]"
                                        className={`${inputClassName} mt-4`}
                                        maxLength={6}
                                    />
                                    <Button
                                        type="button"
                                        size="lg"
                                        className="mt-2 w-full h-12 bg-black text-[#e0f7ff] text-sm shadow-[4px_4px_0_0_#fff] hover:bg-black/85"
                                    >
                                        Join →
                                    </Button>
                                </div>
                            </div>

                            <p className="text-center font-mono text-[10px] uppercase tracking-widest text-black/50">
                                [ keep hands on home row ] • [ caps lock: off ]
                            </p>
                        </div>

                        <div className="mt-8 border-t-2 border-black pt-4 text-center">
                            <p className="font-mono text-xs uppercase tracking-widest text-black/70">
                                Not ready for the big leagues?
                            </p>
                            <Link
                                href="/test"
                                className="mt-2 inline-block font-bold uppercase tracking-wide underline decoration-2 underline-offset-4 hover:bg-yellow-300"
                            >
                                Practice solo first →
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

            {showRoomCodeWindow && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white border-[3px] border-black shadow-[8px_8px_0_0_#000] w-full max-w-md animate-pop">
                        <div className="flex items-center justify-between px-6 py-4 border-b-[3px] border-black bg-[#c8ff00]">
                            <div>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-black/60">
                                    {'// ROOM CREATED [01]'}
                                </span>
                                <h2 className="text-xl font-bold uppercase tracking-tight">
                                    Your room
                                </h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                className="border-2 border-black bg-white text-black hover:bg-red-500 hover:text-white brutal-shadow"
                                onClick={() => setShowRoomCodeWindow(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">
                            <p className="font-mono text-xs uppercase tracking-widest text-black/70 text-center">
                                Share this code with your friends:
                            </p>

                            <div className="flex items-center justify-center border-[3px] border-black bg-yellow-300 brutal-shadow py-7 px-4">
                                <span className="font-mono text-5xl font-bold tracking-[0.3em] pr-[0.3em] text-black select-all">
                                    {createdRoomCode}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    size="lg"
                                    className="flex-1 h-12 bg-black text-[#c8ff00] text-sm shadow-[4px_4px_0_0_#ffd400] hover:bg-black/85"
                                    onClick={() => {
                                        navigator.clipboard.writeText(createdRoomCode);
                                        setCodeCopied(true);
                                        setTimeout(() => setCodeCopied(false), 1500);
                                    }}
                                >
                                    {codeCopied ? 'Copied!' : 'Copy code'}
                                </Button>
                                <Button
                                    type="button"
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 h-12 bg-white text-sm"
                                    onClick={() => setShowRoomCodeWindow(false)}
                                >
                                    Done
                                </Button>
                            </div>

                            <p className="text-center font-mono text-[10px] uppercase tracking-widest text-black/50">
                                [ room lives until the host leaves ]
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}