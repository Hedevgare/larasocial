import InputError from '@/Components/InputError';
import Post from '@/Components/Post';
import PrimaryButton from '@/Components/PrimaryButton';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Index({ auth, posts }) {
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
            </div>
        </Authenticated>
    );
}