import { useAppSelector } from '@/redux/store';

export default function Todo() {
    const { name } = useAppSelector((state) => state.users.currentUser);

    return (
        <>
            <h1>Hello, {name}</h1>
        </>
    );
}