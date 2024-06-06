'use server'
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export async function Signout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error(error)
    }
    redirect('/')
}