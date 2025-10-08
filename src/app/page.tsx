import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";
import AuthButton from "@/lib/auth/components/auth-button";
import { createClient } from "@/lib/auth/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  // check if user is logged in
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
if (user) {
  redirect('/loop/dashboard');
}
  return (
    <main className="w-full mx-auto px-4 space-y-10  ">
<<<<<<< HEAD
      <AuthButton content="Login with GitHub" />
=======
      
>>>>>>> 883019b9f8b77263622d87f7becd2356fb00753f
    </main>
  );
}