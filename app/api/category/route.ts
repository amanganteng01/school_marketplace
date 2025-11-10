import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//Methode GET atau ambil semua data
export async function GET() {
    try {
        const categories = await prisma.category.findMany()
        return NextResponse.json({"data": categories}, {status: 200})
    }catch (error){
        return NextResponse.json({"message": "Error retrieving categories"}, {status: 500})
    }
}

//Methode POST atau menambah data
export async function POST(request: Request){
    try{
        const body = await request.json()
        const category = await prisma.category.create({
            data: {
                category_name: body.category_name
            }
        })
        return NextResponse.json({"data": category}, {status: 201})
    }catch (error){
        return NextResponse.json({"message": "Error creating category"}, {status: 500})
    }
}