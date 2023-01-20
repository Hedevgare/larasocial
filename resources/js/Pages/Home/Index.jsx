import InputError from '@/Components/InputError';
import Post from '@/Components/Post';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Index({ auth, posts, suggested_follows }) {
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
                        <img className="w-[120px] m-auto rounded-full border-2 border-gray-800" src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" />
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
                            <Post key={post.id} post={post} />
                        )}
                    </div>
                </div>
                <div className="hidden xl:block w-full lg:w-[350px] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <p className="text-lg font-bold">Who to follow</p>
                        {suggested_follows.map(suggested =>
                            <div key={suggested.id} className="flex items-center mt-6">
                                <img className="w-[40px] rounded-full border-2 border-gray-800 mr-6" src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" />
                                <div className="truncate grow">
                                    {suggested.name}
                                </div>
                                <div className="row-end-1">
                                    <SecondaryButton>+</SecondaryButton>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}