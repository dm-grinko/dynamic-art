"use client";
import Link from "next/link";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { addNewUser } from "@/services/user.service";
import { category } from "@/redux/initial-states";

export default function AddNewUserModal() {
    const dispatch = useDispatch<AppDispatch>();
    const [userName, setUserName] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const router = useRouter();

    const adminId = useAppSelector((state) => state.users.admin.adminId);
    const categories = useAppSelector((state) => state.album.categories);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!adminId) {
            console.error('Attempt to add a new user w/o adminId');
            return;
        }
        if (!files || !files.length || !userName || !selectedCategory) {
            return;
        }

        const formData = new FormData();
        formData.append('adminId', adminId);
        formData.append('userName', userName);
        formData.append('categoryId', selectedCategory);
        for (const file of files) {
            formData.append('files', file);
        }

        dispatch(addNewUser(formData));
        router.push('/users', { scroll: false })
    };

    const handleChange = (event: any) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <>
            <div className="modal add-new-user-modal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New user</h5>
                            <Link href="/users" className="btn btn-light">&times;</Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <label htmlFor="user-name">User name</label>
                                <br />
                                <div id="user-name" className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="">Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>

                                <br />
                                <label htmlFor="user-photos">User photos</label>
                                <br />
                                <div className="input-group">
                                    <div id="user-photos" className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            multiple
                                            onChange={(e) => setFiles([...e.target.files as unknown as File[]])}
                                        />
                                    </div>
                                    {/* <button type="button" className="btn btn-light take-photo">
                                    Take a photo
                                </button> */}
                                </div>

                                <br />
                                <label htmlFor="form-select">Images category</label>
                                <select id="form-select" className="form-select" value={selectedCategory} onChange={handleChange}>
                                <option value="" disabled>Choose category</option>
                                    { categories && categories.map((category: category, index: number) => {
                                        return <option key={index + 1} value={category.categoryId}>
                                            {category.categoryName} 
                                        </option>
                                    })}
                                </select>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" disabled={!files || !files.length || !userName || !selectedCategory} className="btn btn-secondary">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
