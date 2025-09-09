
import { createClient } from "../auth/supabase/client";
import { err, ok } from "../models";

export const createSupabaseServices = async () => {
    const supabase = await createClient();
    return {
        signIn: async () =>
            supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: "http://localhost:3000/auth/callback",
                },
            }),
        signOut: async () => supabase.auth.signOut(),
        getUser: async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                return err(error.message);
            }
            return ok({ user: data.user });
        },
        getIsAuthed: async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data.user) {
                if (error){
                    return err(error.message);
                }
                return err("User not authenticated");
            }
            return ok({ isAuthed: true });
        },
    };
};
