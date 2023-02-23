import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';
import SecondaryButton from './SecondaryButton';

export default function FollowUser({ user }) {
    const { data, processing } = useForm({
        user_id: user.id
    });
    
    const [ isFollowing, setIsFollowing ] = useState(false);

    const follow = () => {
        axios.post(route('follow'), data)
            .then((res) => setIsFollowing(true));
    }

    return (
        <div key={user.id} className="flex items-center mt-6">
            <img className="w-[50px] rounded-full mr-6" src={user.profile_photo} />
            <div className="truncate grow">
                {user.name}
            </div>
            <div className="row-end-1">
                {!isFollowing && <SecondaryButton onClick={follow} processing={processing}>+</SecondaryButton>}
            </div>
        </div>
    );
}