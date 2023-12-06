'use client'

import Link from "next/link";
import { useEffect } from "react";
import useSound from "use-sound";
import axios from "@/app/lib/axios";
import { AiFillStar } from "react-icons/ai"

export default function GameResultCard ({ result, answer_id, attempts, route }) {
    
    const [win] = useSound('/sfx/mixkit-successful-horns-fanfare-722.wav');
    const [gameover] = useSound('/sfx/mixkit-sad-game-over-trombone-471.wav');

    function getStars () {
        let stars = 0
        if (result) {
            attempts < 6 ? (attempts < 3 ? stars = 1 : stars = 2) : stars =3
        } else {
            stars = 0
        }
        return stars
    }

    useEffect(()=>{
        const saveGame = async () => {
            try {
                const stars = getStars()
                await axios.post('/api/logs/save', {student_id: localStorage.getItem('student_token'), answer_id: answer_id, status: result, stars: stars})
                .then(res=>{console.log(res)})
                .catch(err=>{console.log(err)})
            } catch (error) {
              console.log(error)
            }
        }
        saveGame()
    }, [])

    return (
        <div>
            {
                result ?
                <p>You win!</p> 
                :
                <p>Game over!</p>
            }
            {result ? win() : gameover()}
            <div className="flex space-x-2">
                <Link href={'/'} className="border p-2 rounded-lg w-1/3 text-center">select level</Link>
                <button className="border p-2 rounded-lg w-1/3" onClick={() => window.location.reload()}>Play Again</button>
                <Link href={route} className="border p-2 rounded-lg w-1/3 text-center">next level</Link>
            </div>
            <div className="flex justify-center items-center pt-10">
                <span>You get:</span>
                <RenderStars star={getStars()} />
            </div>
        </div>
    )
}

function RenderStars({ star }) {
    const arr = new Array(star).fill(null)
    return (
        <span className="flex gap-2">
            {
                arr.map((item,id)=>{
                    return (
                        <AiFillStar key={id} className="w-5 h-5 text-amber-200" />
                    )
                })
            }
        </span>
    )
}