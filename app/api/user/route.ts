import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            data: users
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error fetching users: ', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json();

        const hashedPassword = await bcrypt.hash(body.password.trim(), 10);

        const user = await prisma.user.create({
            data: {
                name:  body.name.trim(),
                contact: body.contact.trim(),
                username: body.username.trim(),
                password: hashedPassword,
                role: body.role.trim()
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'Gagal menambah user'
            });
        }

        return NextResponse.json({
            success: true,
            data: user
        })
    } catch (error) {
        console.error('Error create user: ', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        })
    }
}