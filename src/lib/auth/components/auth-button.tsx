"use client"
import { createClient } from '@/lib/auth/supabase/client'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function AuthButton({content}: {content?: string}) {
    const supabase = createClient();
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/api/callback`,
            },
            
        })
    }

    return (
        <Button variant='outline' className='shadow-none' onClick={handleSignIn}>
            {content || 'Login into Europa'}
        </Button>
    )
}
