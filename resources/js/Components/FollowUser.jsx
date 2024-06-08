import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';

export default function FollowUser({ user }) {
    const { data } = useForm({
        user_id: user.id
    });

    const [isFollowing, setIsFollowing] = useState(false);

    const follow = () => {
        axios.post(route('follow'), data)
            .then((res) => setIsFollowing(true));
    }

    return (
        <div key={user.id} className="flex justify-between items-center mt-6">
            <img className="w-[50px] rounded-full mr-6" src={user.profile_photo} />
            <div className="truncate grow mr-5">
                {user.name}
            </div>
            <div className={"inline-flex h-[40px] min-w-[40px] rounded-full items-center justify-center cursor-pointer " + (isFollowing ? "border" : "bg-larasocial-secondary text-white")} onClick={follow}>
                {!isFollowing ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                }
            </div>
        </div>
    );
}