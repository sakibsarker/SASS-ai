"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();

  console.log(user);

  console.log("USER:", user);
  return (
    <div>
      <h1>Home page</h1>
      <div>
        {!!user ? (
          <>
            <div>
              <h2>Name: {user.name}</h2>
              <p>Email: {user.email}</p>
            </div>
            <Link href="/api/auth/logout">Logout</Link>
          </>
        ) : (
          <Link href="/api/auth/login">Login</Link>
        )}
      </div>
    </div>
  );
}
