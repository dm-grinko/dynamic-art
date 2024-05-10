"use client";
import AddNewUserModal from "@/components/add-user-modal";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { deleteUsers, getUserList } from "@/services/websockets";
import User from "@/components/user";
import { onGetCategoryListByUserID } from "@/services/category.service";

import { useRouter } from 'next/navigation';

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Users({ searchParams }: SearchParamProps) {
  const showAddNewUserModal = searchParams?.modal;

  const users = useAppSelector((state) => state.users.users);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => { dispatch(getUserList()) }, [dispatch]);

  const onDeleteUsers = () => dispatch(deleteUsers());
  const categories = useAppSelector((state) => state.album.categories);

  const adminId = useAppSelector((state) => state.users.admin.adminId);
  const router = useRouter();

  useEffect(() => {
    {
      if (adminId) {
        dispatch(onGetCategoryListByUserID(adminId));
      }
    }
  }, [dispatch, adminId]);

  const openModal = (e: any) => {
    e.preventDefault()
    if (!categories || !categories.length) {
      console.log('You need to add categories with photos first');
      return;
    }

    router.push('/users/?modal=true', { scroll: false })
  }

  return (
    <div className="container users">
      <br />
      <br />
      <h1>Users</h1>
      <h3>Create and manage user profiles for image association</h3>

      <br />
      <br />
      <button  type="button" className="btn btn-primary" onClick={(e) => openModal(e)}>Add New User</button>
      {showAddNewUserModal && <AddNewUserModal />}
      <br />
      <br />
      {users.length ? <button type="button" onClick={onDeleteUsers} className="btn btn-primary">Delete users</button> : ""}
      <br />
      <br />
      {
        users && <ul className="users-page-users">
          {users.map((user, index) => {
            return <li key={index}>
              <User user={user}></User>
            </li>
          })}
        </ul>
      }
      <br />
    </div>
  );
}



