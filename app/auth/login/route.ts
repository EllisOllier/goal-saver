'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function POST(
    _req: NextRequest
){
    const supabase = await createClient();

    // TODO: Validate request body
    const body = await _req.json()
    const data = { // very basic validation
        email: body.email as string,
        password: body.password as string,
    }
    
    const { error } = await supabase.auth.signInWithPassword(data);

    if(error){
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/profile')
}