"use client";

import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import AddCategoryModal from "@/components/add-category-modal";
import Link from "next/link";
import Category from '@/components/category';
import { onGetCategoryListByUserID } from '@/services/category.service';
import { useEffect } from 'react';

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Images({ searchParams }: SearchParamProps) {
  const showCategoryModal = searchParams?.modal;

  const categories = useAppSelector((state) => state.album.categories);
  const adminId = useAppSelector((state) => state.users.admin.adminId);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => { {
    if (adminId) {
      dispatch(onGetCategoryListByUserID(adminId));
    }
  }}, [dispatch, adminId]);

  return (
      <div className="container images">
        <br />
        <br />
        <h1>Images</h1>
        <h3>Manage and upload your images for facial recognition</h3>        
        <br/>
        <br/>
        <Link href="/images/?modal=true" className="btn btn-primary">Add Category</Link>
            {showCategoryModal && <AddCategoryModal></AddCategoryModal>}

            <br/>
        <br/>
        <ul className="users-page-users">
          {categories && categories.map((category, index) => {
            return <li key={index}>
               <Category category={category}></Category>
            </li>
          })}
        </ul>

      </div>
  );
}

