import FollowUser from '@/Components/FollowUser';
import InputError from '@/Components/InputError';
import Post from '@/Components/Post';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Toast from '@/Components/Toast';
import CommentIcon from '@/Icons/CommentIcon';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useRef, useState, useEffect } from 'react';

export default function Index({ auth, posts, suggested_follows, following }) {
    const textAreaRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
    });

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (showToast) {
            const timeout = setTimeout(() => setShowToast(false), 5000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [showToast]);

    const onChangePost = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        setData('message', e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'), {
            onSuccess: () => {
                reset();
                setShowToast(true);
                textAreaRef.current.style.height = 'inherit';
            }
        });
    }

    return (
        <Authenticated auth={auth}>
            <Head title="Posts" />

            {showToast ? <Toast message="New post created!" onClose={() => setShowToast(false)} /> : null}

            <div className="flex flex-col md:flex-row p-12 2xl:pr-36 2xl:pl-36 xl:pr-20 xl:pl-20">
                {/* Left Column */}
                <div className="flex-1 hidden md:block w-full xl:w-[300px] mx-auto sm:px-6 xl:px-4">
                    <div className="bg-white overflow-hidden shadow-sm p-6 text-center">
                        <img className="w-[120px] m-auto rounded-lg border-4 border-white" src={auth.user.profile_photo} />
                        <p className="mt-6">{auth.user.name}</p>
                    </div>
                </div>
                {/* Center */}
                <div className="flex-[3_3_0%] mx-auto sm:px-6 xl:px-4">
                    <div className="bg-white overflow-hidden shadow-sm">
                        {/* <div className="p-6"> */}
                        <form onSubmit={submit}>
                            <div className="p-6">
                                <textarea ref={textAreaRef} className="w-full border-none resize-none focus:ring-0" placeholder="Share your thoughts..." value={data.message} onChange={(e) => onChangePost(e)}></textarea>
                                <InputError message={errors.message} />
                            </div>
                            <hr />
                            <div className="flex flex-row p-6">
                                <PrimaryButton className="ml-auto" processing={processing}>Post</PrimaryButton>
                            </div>
                        </form>
                        {/* </div> */}
                    </div>
                    <div className="my-6">
                        {posts.map(post =>
                            <Post key={post.id} postId={post.id} userPost={post} profilePhoto={auth.user.profile_photo} />
                        )}
                    </div>
                </div>
                {/* Right Column */}
                <div className="flex-1 hidden xl:block w-full xl:w-[350px] mx-auto sm:px-6 xl:px-4">
                    <div className="bg-white shadow-sm p-6">
                        <p className="text-lg font-bold">Who to follow</p>
                        {suggested_follows.map(suggested =>
                            <FollowUser key={suggested.id} user={suggested} />
                        )}
                    </div>
                    <div className="bg-white shadow-sm p-6 mt-6">
                        <p className="text-lg font-bold">Following</p>
                        {following.map(suggested =>
                            <div key={suggested.id} className="flex items-center mt-6">
                                <img className="w-[50px] rounded-full mr-6" src={suggested.profile_photo} />
                                <div className="truncate grow">
                                    {suggested.name}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}