"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "../public/banner.jpg";
import { Logo } from '../components/logo/index'

export default function Home() {

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src={HeroImage} alt="Hero" fill className="absolute"/>
      <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/50 rounded backdrop-blur-sm">
        <Logo/>
        <p className="text text-justify">Revolutionize marketing with cutting-edge AI-generated content.
           Elevate your brand, captivate audiences, and stay ahead of the competition. 
           Transforming posts into powerful marketing assets with innovative artificial intelligence solutions.</p>
        <Link className="btn mt-2" href='/post/new'>Start Now</Link>
      </div>
    </div>
  );
}


