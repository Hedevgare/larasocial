import FollowUser from '@/Components/FollowUser';
import InputError from '@/Components/InputError';
import Post from '@/Components/Post';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Toast from '@/Components/Toast';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
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
                    <div className="relative h-[75px] w-[100%] bg-larasocial-secondary"></div>
                    <div className="bg-white overflow-hidden shadow-sm z-10 -mt-10">
                        <img className="relative w-[120px] m-auto rounded-lg border-4 border-white" src={auth.user.profile_photo} />
                        <div className="p-6 text-center">
                            <p className="font-bold text-lg my-2">{auth.user.name}</p>
                            <p className="text-sm text-gray-500">Web Developer at Hedegare</p>
                            <p className="mt-5 text-gray-500">I'd love to change the world, but they won’t give me the source code.</p>
                        </div>
                        <hr />
                        <Link href="#" className="block p-4 text-center text-larasocial-secondary font-bold">View Profile</Link>
                    </div>
                </div>
                {/* Center */}
                <div className="flex-[3_3_0%] mx-auto sm:px-6 xl:px-4">
                    <div className="bg-white overflow-hidden shadow-sm">
                        <form onSubmit={submit}>
                            <div className="p-6">
                                <textarea ref={textAreaRef} className="w-full border-none resize-none focus:ring-0" placeholder="Share your thoughts..." value={data.message} onChange={(e) => onChangePost(e)}></textarea>
                                <InputError message={errors.message} />
                            </div>
                            <hr />
                            <div className="flex flex-col sm:flex-row p-6">
                                <div className="flex flex-col sm:flex-row sm:space-x-4">
                                    <SecondaryButton>
                                        <i className="bi bi-image-fill mr-2 text-lime-600"></i>
                                        Photo
                                    </SecondaryButton>
                                    <SecondaryButton>
                                        <i className="bi bi-camera-video mr-2 text-red-600 text-base"></i>
                                        Video
                                    </SecondaryButton>
                                    <SecondaryButton>
                                        <i className="bi bi-calendar-event mr-2 text-yellow-500"></i>
                                        Event
                                    </SecondaryButton>
                                </div>
                                <PrimaryButton className="mt-4 sm:mt-0 sm:ml-auto" processing={processing}>
                                    <i className="bi bi-send mr-2 text-white text-base"></i>
                                    Post
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                    <div className="my-6">
                        {posts.map(post =>
                            <Post key={post.id} postId={post.id} userPost={post} />
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