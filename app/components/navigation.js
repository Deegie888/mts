'use client';

import { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import axios from "../lib/axios";
import Swal from "sweetalert2";

export default function Navigation () {

    const [openSettings, setOpenSettings] = useState(false)
    const [player, setPlayer] = useState({
        student_id: '',
        student_name: ''
    })

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            const getData = async () => {
                try {
                    await csrf()
                    await axios.post('/api/student/validation', {student_id: localStorage.getItem('student_token')})
                    .then(res=>{
                        console.log(res)
                        setPlayer({
                            student_id: res.data.student_id,
                            student_name: res.data.student.student_name
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            getData()
        }
    }, [])
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const changeName = async () => {
        try {
            await csrf()
            await axios.post('/api/student/update', player)
            .then(res=>{
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                Swal.fire(err.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fixed top-0 w-full flex justify-end z-50 p-3">
            <button
                onClick={()=>setOpenSettings(!openSettings)}
            >
                <AiFillSetting className="text-white w-6 h-6 hover:text-slate-900" />
            </button>
            <div className={`${openSettings ? 'w-full md:w-1/5 h-60 p-6 absolute top-20 text-white bg-slate-900 rounded-lg space-y-6' : 'hidden'}`}>
                <p className="text-center text-xl font-bold">Player Info</p>
                <p className="text-xs"><span className="font-bold">Player ID:</span> {player.student_id}</p>
                <div>
                    <label className="text-xs font-bold">Player name:</label>
                    <input 
                        type="text"
                        className="w-full p-2 rounded-lg bg-slate-900 border border-white"
                        placeholder="Player name"
                        onChange={e=>setPlayer({...player,student_name: e.target.value})}
                        value={player.student_name}
                    />
                    <button
                        onClick={changeName}
                        className="text-xs hover:font-bold text-teal-600"
                    >
                        change name
                    </button>
                </div>
            </div>
        </div>
    )
}