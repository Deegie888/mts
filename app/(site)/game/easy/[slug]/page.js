'use client'

import Hangaroo from "@/app/components/game/hangaroo";
import Logo from "@/app/components/logo";
import Navigation from "@/app/components/navigation";
import { useEffect, useState } from "react";

export default function Game ({ params }) {

    return (
        <div className="absolute w-full h-full flex justify-center p-6 bg-gradient-to-b from-amber-300 from-30% to-teal-300">
          <Navigation />
          <div className="w-full space-y-5">
            <div>
              <Logo />
            </div>
            <div className="flex justify-center w-full">
              <Hangaroo difficulty={'easy'} level={params.slug} />
            </div>
          </div>
        </div>
    )
}