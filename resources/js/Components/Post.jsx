import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TextInput from './TextInput';
import CommentIcon from '../Icons/CommentIcon';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import LikeIcon from '@/Icons/LikeIcon';
import Comment from './Comment';

dayjs.extend(relativeTime);

export default function Post({ postId, userPost, profilePhoto }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        post_id: postId,
        message: '',
    });

    const [showCommentBox, setShowCommentBox] = useState(false);

    const [comments, setComments] = useState([]);

    const [isLiked, setIsLiked] = useState(userPost.is_liked)

    const loadComments = () => {
        if (!showCommentBox && comments.length <= 0) {
            axios.get(route('posts.show', { post: data.post_id }))
                .then((res) => setComments(res.data.comments))
                .catch(err => console.error("Error: " + err));
        }
        setShowCommentBox(!showCommentBox);
    }

    const submit = (e) => {
        if (e.key === 'Enter') {
            axios.post(route('comments.store'), data)
                .then((res) => {
                    data.id = res.data.id;
                    data.user = res.data.user;
                    data.created_at = res.data.created_at;
                    setComments([data, ...comments]);
                    reset();
                });
        }
    }

    const submitLike = (e) => {
        if(isLiked === true) {
            console.log(`Already liked... ${isLiked}`);
        } else {
            axios.post(route('likes.store'), { post_id: data.post_id })
                .then(res => setIsLiked(true));
        }
    }

    return (
        <div className="my-4 p-6 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center">
                <img className="w-[40px] h-[40px] mr-6 rounded-full" src={userPost.user.profile_photo} />
                <strong className="mr-2">{userPost.user.name}</strong>
                &middot;
                <small className="ml-2 text-xs">{dayjs(userPost.created_at).fromNow(true)} ago</small>
            </div>
            <p className="pt-6 text-gray-600">
                {userPost.message}
            </p>
            <div className="mt-6">
                <div className='flex'>
                    <div className='flex mr-6 cursor-pointer' onClick={submitLike}>
                        <LikeIcon fill={isLiked} />
                        <p className="inline ml-2 text-sm">Like{isLiked ? 'd' : null} {userPost.total_likes > 0 ? `(${userPost.total_likes})` : null}</p>
                    </div>
                    <div className='flex cursor-pointer'>
                        <CommentIcon />
                        <p className="inline ml-2 text-sm" onClick={() => loadComments()}>Comment {userPost.total_comments > 0 ? `(${userPost.total_comments})` : null}</p>
                    </div>
                </div>
                {showCommentBox &&
                    <React.Fragment>
                        <div className='flex mt-3 mb-3'>
                            <img className="w-[32px] h-[32px] mr-2 rounded-full" src={profilePhoto} />
                            <TextInput parentClassName="flex-grow" className="w-full bg-gray-100" value={data.message} handleChange={(e) => setData('message', e.target.value)} placeholder="Add a comment...." handleEnter={submit} />
                        </div>
                        {comments.map((comment) =>
                            <Comment key={comment.id} comment={comment} />
                        )}
                    </React.Fragment>
                }
            </div>
        </div>
    )
}