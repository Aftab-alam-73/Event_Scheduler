import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { PenBox } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import UserMenu from './user-menu'
import { checkUser } from '@/lib/checkUser'



  const Header = async() => {
   const user= await checkUser()
    return (
      <nav className='mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2'>
        <Link href={"/"} className='flex items-center '>
          <Image src="/logo.png" alt="logo" width="150" height="60" className='h-16 w-auto '
          />
        </Link>

        <div className='flex items-center gap-4'>
         {
          user &&  <Link href="/events?create=true">
          <Button className="flex items-center gap-2" ><PenBox size={18} />Create Event</Button>
        </Link>
         }
          {/* it  will  only be   rendering  when user is not loggedin */}
          <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>

              <Button>Login</Button>
            </SignInButton>
          </SignedOut>  
          {/* it  will   only be rendering  when user is signedin */}
          <SignedIn>
          <UserMenu/>
          {/* <UserButton/> */}
          </SignedIn> 

        </div>
      </nav>
    )
  }

  export default Header


