import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logo } from '../logo'

export const AppLayout = ({ children, availableTokens }) => {
  const { user, error, isLoading } = useUser();
  console.log("APP PROPS:", availableTokens)
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">

      <div className="flex flex-col text-white overflow-hidden">
        <div className="bg-slate-800 px-2">
          <Logo/>
          <Link className="btn" href='/post/new'>New post</Link>
          <Link className="block mt-2 text-center" href='/token-topup'>
            <FontAwesomeIcon icon={faCoins} className="text-yellow-500"/>
            <span className="pl-1"> { availableTokens} tokens available</span>
         </Link>
        </div>
        <div className="flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-blue-500">list of posts</div>
        <div className=" bg-slate-700 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
        {!!user ? (
          <>
            <div className="min-w-[50px]">
              <Image
                src={user.picture}
                alt={user.name}
                height={50}
                width={50}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
            <p className="font-bold">{user.email}</p>
            <Link className="text-sm font-medium" href="/api/auth/logout">
              <p className="pb-1 px-5 w-min rounded-md text-black bg-white hover:bg-black hover:text-white">Logout</p>
              </Link>
            </div>
            
          </>
        ) : (
          <Link href="/api/auth/login">Login</Link>
        )}
        </div>
      </div>

      <div>{children}</div>
      
    </div>
  );
};
