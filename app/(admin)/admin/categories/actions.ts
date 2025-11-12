import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CATEGORY } from "./type";

export async function GetCategory(): Promise<CATEGORY[]>{
    try {
        const category = await prisma.category.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        return category
    } catch (error) {
        console.error('Error mengambil produk:', error);
        return[];
    }
}

export async function CreateCategory(formData: FormData) {
    const category_name = formData.get('category_name') as string;

    if (!category_name) {
        return { error: 'Isi nama kategori terlebih dahulu!' }
    }

    try {
        await prisma.category.create({
            data: {
                category_name
            }
        })

        revalidatePath('/admin/categories');
        return { succes: 'Berhasil menambah data' }
    } catch (error) {
        return { error: 'Gagal menambah data' }
    }
}

