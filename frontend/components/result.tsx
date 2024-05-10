"use client"

import { AppDispatch, useAppSelector } from "@/redux/store";
import { onGetCategoryListByUserID } from "@/services/category.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Image from 'next/image';
import { getUserRandomImage } from "@/services/websockets";

const Result = ({ currentUser, categories }: any) => {

  const [category, setCategory] = useState<any>(null)


  const dispatch = useDispatch<AppDispatch>();
  const adminId = useAppSelector((state) => state.users.admin.adminId);


  useEffect(() => {
    if (adminId) {
      dispatch(onGetCategoryListByUserID(adminId));
    }
  }, [dispatch, adminId]);


  useEffect(() => {
    console.log('Ask for random image');
    if (adminId && category) {
      dispatch(getUserRandomImage(adminId, category.categoryId));
    }

  }, [category]);


  useEffect(() => {
    if (categories && categories.length) {
      const _category = categories.find((c: any) => c.categoryId === currentUser.categoryId);
      setCategory(_category);
    }
  }, [currentUser, categories])

  return (
    <>
      <h3>{category && category.categoryName} images for {currentUser.userName}</h3>

      {currentUser.userImage &&
        <Image
          src={currentUser.userImage}
          width={500}
          height={500}
          alt="image"
        />
      }
    </>
  );
};
export default Result;