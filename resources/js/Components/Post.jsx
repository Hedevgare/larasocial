import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TextInput from './TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

dayjs.extend(relativeTime);

export default function Post({ postId, userPost }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        post_id: postId,
        message: '',
    });

    const [showCommentBox, setShowCommentBox] = useState(false);

    const [comments, setComments] = useState([]);

    const loadComments = () => {
        if (!showCommentBox && comments.length <= 0) {
            axios.get(route('posts.show', {post: data.post_id}))
                .then((res) => setComments(res.data.comments))
                .catch(err => console.error("Error: " + err));
        }
        setShowCommentBox(!showCommentBox);
    }

    const submit = (e) => {
        if (e.key === 'Enter') {
            axios.post(route('comments.store'), data)
                .then((res) => {
                    setShowCommentBox(false);
                    reset();
                });
        }
    }

    return (
        <div className="my-4 p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex items-center">
                <img className="w-[40px] mr-6 rounded-full" src={userPost.user.profile_photo} />
                <strong className="mr-2">{userPost.user.name}</strong>
                &middot;
                <small className="ml-2 text-xs">{dayjs(userPost.created_at).fromNow(true)}</small>
            </div>
            <p className="pt-6 text-gray-600">
                {userPost.message}
            </p>
            <div className="mt-6">
                <p className="text-sm cursor-pointer" onClick={() => loadComments()}>Comment</p>
                {showCommentBox &&
                    <React.Fragment>
                        <TextInput className="w-full" value={data.message} handleChange={(e) => setData('message', e.target.value)} placeholder="Add a comment...." handleEnter={submit} />
                        {comments.map((comment) => 
                            <p className='p-4' key={comment.id}>{comment.message}</p>
                        )}
                    </React.Fragment>
                }
            </div>
        </div>
    )
}