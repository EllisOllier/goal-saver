import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_req: NextRequest) {
    const supabase = await createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
        return NextResponse.json(
            { error: "Not Authenticated!" },
            { status: 401 }
        );
    }

    const { data: goals, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ goals });
}

export async function POST(_req: NextRequest){
    const supabase = await createClient();

    const { data: { user }, error: userError, } = await supabase.auth.getUser();

    if(userError || !user){
        return NextResponse.json({ error: "Unauthorised!"}, { status: 401 });
    }

    const body = await _req.json();
    const { title, description, target_amount, category, deadline } = body;

    if(!title || !target_amount || !category){
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('goal')
        .insert([
            {
                user_id: user.id,
                title,
                description: description || null,
                target_amount,
                current_amount: 0,
                category,
                deadline: deadline || null,
            }
        ])
        .select()
        .single();
    
    if(error){
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}