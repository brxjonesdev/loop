"use client"
import { createClient } from "../auth/supabase/client";
import { err, ok } from "../models";

export const clientAuthServices = {
  signIn: async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/journal`,
        },
      });
      
      if (error) {
        return err(error.message);
      }
      return ok({ url: data?.url });
    } catch (error) {
      return err(error instanceof Error ? error.message : 'Unknown error');
    }
  },
  
  signOut: async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        return err(error.message);
      }
      return ok({ success: true });
    } catch (error) {
      return err(error instanceof Error ? error.message : 'Unknown error');
    }
  },
  
  getUser: async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        return err(error.message);
      }
      return ok({ user: data.user });
    } catch (error) {
      return err(error instanceof Error ? error.message : 'Unknown error');
    }
  }
};