"use client"
import Detector from "@/components/detector";
import Result from "@/components/result";
import { useAppSelector } from '@/redux/store';

export default function Show() {
  const currentUser = useAppSelector((state) => state.users.currentUser);

  const categories = useAppSelector((state) => state.album.categories);

    return (
        <div className="container show">
          <Detector></Detector>
          <br />
          <h1>Dynamic Art</h1>
          <h3>View assigned images based on facial recognition</h3>
          <br />
          <br />
          <br />
          { currentUser.userName && <Result currentUser={currentUser} categories={categories}></Result>}
          {/* { !currentUser.userName && <h2>Loading...</h2>} */}
        </div>
    );
  }
  