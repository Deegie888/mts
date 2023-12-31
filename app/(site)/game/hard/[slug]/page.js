'use client'

import Hangaroo from "@/app/components/game/hangaroo";
import { useEffect, useState } from "react";
import Logo from "@/app/components/logo";
import Navigation from "@/app/components/navigation";

export default function Game ({ params }) {

    return (
      <div className="absolute w-full h-full flex justify-center p-6 bg-gradient-to-b from-amber-300 from-30% to-teal-300 bg_game">
        <Navigation />
        <div className="w-full space-y-5 shadow-2xl">
          <div>
            <Logo />
          </div>
          <div className="flex justify-center w-full">
            <Hangaroo difficulty={'hard'} level={params.slug} />
          </div>
        </div>
      </div>
    )
}