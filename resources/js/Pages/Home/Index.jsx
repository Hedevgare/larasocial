import FollowUser from '@/Components/FollowUser';
import InputError from '@/Components/InputError';
import Post from '@/Components/Post';
import PrimaryButton from '@/Components/PrimaryButton';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Index({ auth, posts, suggested_follows, following }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'), { onSuccess: () => reset() });
    }

    return (
        <Authenticated auth={auth}>
            <Head title="Posts" />

            <div className="flex flex-col xl:flex-row p-12">
                <div className="hidden xl:block w-full lg:w-[350px] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-center">
                        <img className="w-[120px] m-auto rounded-lg border-4 border-white" src={auth.user.profile_photo} />
                        <p className="mt-6">{auth.user.name}</p>
                    </div>
                </div>
                <div className="flex-1 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <textarea className="w-full border-gray-300 rounded-lg h-24" placeholder="Share your thoughts..." value={data.message} onChange={(e) => setData('message', e.target.value)}></textarea>
                                <InputError message={errors.message} />
                                <PrimaryButton className='mt-4' processing={processing}>Post</PrimaryButton>
                            </form>
                        </div>
                    </div>
                    <div className="my-6">
                        {posts.map(post =>
                            <Post key={post.id} postId={post.id} userPost={post} />
                        )}
                    </div>
                </div>
                <div className="hidden xl:block w-full lg:w-[350px] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <p className="text-lg font-bold">Who to follow</p>
                        {suggested_follows.map(suggested =>
                            <FollowUser key={suggested.id} user={suggested} />
                        )}
                    </div>
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 mt-6">
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