import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";
import { loginSchema, signupSchema } from "@/lib/validators";
import { cookies } from "next/headers";
import { signToken } from "@/lib/auth";
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    const body = await req.json();

    console.log(body)

    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, password } = parsed.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await db.insert(users).values({
            username: name,
            email,
            passwordHash: hashedPassword,
        }).returning()

        console.log(user)

        // const token = signToken({ userId: user[0].id });

        // (await cookies()).set("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     path: "/"
        // });

        return NextResponse.json({ message: "User Crested" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "User Already Exist" }, { status: 400 })
    }
}