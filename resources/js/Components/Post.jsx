import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Post({ post }) {
    return (
        <div className="my-4 p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex items-center">
                <img className="w-[40px] mr-6 rounded-full border-2 border-gray-800" src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" />
                <strong className="mr-2">{post.user.name}</strong>
                &middot;
                <small className="ml-2 text-xs">{dayjs(post.created_at).fromNow(true)}</small>
            </div>
            <p className="pt-6 text-gray-600">
                {post.message}
            </p>
        </div>
    )
}