"use client";

import { useActionState } from "react";

export function CreateCategory(){
    // useActionState = State untuk handle hasil server action
    const [ state, formAction, isPending] = useActionState(CreateCategory, null)
    return(
        <form action={formAction}>
            <div className="flex">
                <input type="text" name="category_name" required />
                <button type="submit">
                    Tambah produk
                </button>
            </div>
        </form>
    )
}