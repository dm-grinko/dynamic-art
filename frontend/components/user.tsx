import { user } from "@/redux/initial-states";
import { deleteUser } from "@/services/websockets";
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';

export default function User({user} : any) {
    const dispatch = useDispatch<AppDispatch>();


    const categories = useAppSelector((state) => state.album.categories);

    const onDelete = (user: user) => {
        console.log({user});
        dispatch(deleteUser(user));
    }

    const getCategoryNameByCategoryId = (categoryId: string) => {
        const data = categories.find((cat) => cat.categoryId === categoryId);
        return data ? data.categoryName : "N/A";
    }

    return (
        <div className="card" style={{'width': '18rem'}}>
        <img src={user.userPhotoUrl} className="card-img-top" alt="..."></img>
        <div className="card-body">
            <h5 className="card-title">{user.userName}</h5>
            <p className="card-text">Photos: {user.imageCount}</p>
            <p className="card-text">Category: {getCategoryNameByCategoryId(user.categoryId)}</p>
            {/* <a onClick={() => onDelete(user)} className="btn btn-secondary">Delete</a> */}
        </div>
        </div>
    );
}