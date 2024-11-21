"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

export default function OnboardingCheck() {
    const router = useRouter();
  const supabase = createClient();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userID, setUserID] = useState<string | undefined>(undefined);

useEffect(() => {
    const checkUser = async () => {
        console.log("Checking user");
        const { data: {user}, error } = await supabase.auth.getUser();
        if (error) {
            console.error("Error fetching user:", error.message);
            return;
        }
        setUser(user);
        const userID = user?.id;
        setUserID(userID);
        const { data: profiles, error: profileError } = await supabase.from("profiles").select("*").eq("user_id", userID);
        if (profileError) {
            console.error("Error fetching profile:", profileError.message);
            return;
        }
        if (!profiles || profiles.length === 0) {
            setShowOnboarding(true);
        }
    }
    checkUser();
  }, [supabase]);



const formSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }).regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    // profileImage: z.string().url({
    //   message: "Please enter a valid URL for the profile image.",
    // }).optional(),
})

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.user_metadata.name || "",
      name: user?.user_metadata.full_name || "",
    //   profileImage: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Check if the username already exists
      const { data: existingUsernames, error: usernameError } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", values.username);
  
      if (usernameError) {
        console.error("Error checking username:", usernameError.message);
        throw new Error("Could not verify username availability.");
      }
  
      if (existingUsernames && existingUsernames.length > 0) {
        // Username is taken; set an error on the form field
        form.setError("username", {
          type: "manual",
          message: "This username is already taken. Please choose another.",
        });
        return;
      }
  
      // Add the profile to the database
      const { error } = await supabase.from("profiles").insert({
        user_id: userID,
        username: values.username,
        name: values.name,
        profile_picture: user?.user_metadata.avatar_url || "",
      });
  
      if (error) {
        console.error("Error adding profile:", error.message);
        throw new Error("Could not create profile. Please try again.");
      }
  
      // Successfully created the profile
      router.refresh();
      setShowOnboarding(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during onboarding:", error.message);
      } else {
        console.error("Error during onboarding:", error);
      }
    }
  }
  
 
  
  

  



  return (
    <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
    <DialogContent className="sm:max-w-[425px] font-sans">
      <DialogHeader>
        <DialogTitle className="font-sans">Welcome to Loop, {user?.user_metadata.name}!</DialogTitle>
        <DialogDescription className="font-mono">
          Let&apos;s get you started with Loop. Please fill out the following information.
        </DialogDescription>
      </DialogHeader>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={field.value} alt="Profile" />
                      <AvatarFallback>
                        {form.watch("name")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Input type="url" placeholder="" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  Enter a URL for your profile image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input placeholder={`looper-${nanoid(3)}-${user?.user_metadata.full_name}`} {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder={user?.user_metadata.full_name} {...field} />
                </FormControl>
                <FormDescription>
                  Your name of choice.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>

  );
}
