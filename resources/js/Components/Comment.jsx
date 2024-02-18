import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Comment({ comment }) {
    return (
        <div key={comment.id} className='flex'>
            <img className="w-[32px] h-[32px] mr-2 rounded-full" src={comment.user.profile_photo} />
            <div className='flex-grow mb-3 p-4 bg-gray-100 rounded-r-lg rounded-bl-lg'>
                <div className='flex'>
                    <p className='flex-grow font-bold'>{comment.user.name}</p>
                    <small className="flex items-center text-xs">{dayjs(comment.created_at).fromNow(true)} ago</small>
                </div>
                <p className='text-sm'>{comment.message}</p>
            </div>
        </div>
    );
}