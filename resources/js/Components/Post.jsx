import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TextInput from './TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Comment from './Comment';

dayjs.extend(relativeTime);

export default function Post({ postId, userPost }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        post_id: postId,
        message: '',
    });

    const [showCommentBox, setShowCommentBox] = useState(false);

    const [comments, setComments] = useState([]);

    const [likeId, setLikeId] = useState(userPost.user_like)

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
                    setComments([res.data, ...comments]);
                    reset();
                });
        }
    }

    /**
     * Like or unlike a post and update the total likes count accordingly
     */
    const submitLike = () => {
        if (likeId) {
            axios.delete(route('likes.destroy', { like: likeId }))
                .then(() => {
                    setLikeId(null);
                    userPost.total_likes--;
                })
                .catch(err => console.error(err));
        } else {
            axios.post(route('likes.store'), { post_id: data.post_id })
                .then(res => {
                    setLikeId(res.data.id);
                    userPost.total_likes++;
                });
        }
    }

    return (
        <div className="my-4 p-6 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center">
                <img className="w-[40px] h-[40px] mr-2 rounded-full" src={userPost.user.profile_photo} />
                <div className='flex flex-col'>
                    <strong className="mr-2">{userPost.user.name}</strong>
                    <small className="text-xs">published {dayjs(userPost.created_at).fromNow(true)} ago</small>
                </div>
            </div>
            <p className="pt-6 text-gray-600">
                {userPost.message}
            </p>
            <div className="mt-6">
                <div className='flex space-x-4'>
                    <div className='flex cursor-pointer bg-gray-100 p-2 rounded leading-5' onClick={submitLike}>
                        {likeId ? <i className="bi bi-heart-fill text-gray-500"></i> : <i className="bi bi-heart text-gray-500"></i>}
                        <p className="hidden md:inline ml-2 text-sm text-gray-500">Like{likeId ? 'd' : null} {userPost.total_likes > 0 ? `(${userPost.total_likes})` : null}</p>
                    </div>
                    <div className='flex cursor-pointer bg-gray-100 p-2 rounded leading-5'>
                        <i className="bi bi-chat text-gray-500"></i>
                        <p className="hidden md:inline ml-2 text-sm text-gray-500" onClick={() => loadComments()}>Comment {userPost.total_comments > 0 ? `(${userPost.total_comments})` : null}</p>
                    </div>
                </div>
                {showCommentBox &&
                    <React.Fragment>
                        <hr className='my-5' />
                        <div className='flex mt-3 mb-3'>
                            {/* <img className="w-[32px] h-[32px] mr-2 rounded-full" src={profilePhoto} /> */}
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