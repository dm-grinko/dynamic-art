"use client";
import Link from "next/link";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import {  onCreateCategory } from "@/services/category.service";

class Category {
    categoryName: string;
    categoryId?: string;
    adminId: string;
    count?: number;
    constructor(categoryName: string, adminId: string) {
        this.categoryName = categoryName;
        this.adminId = adminId;
    }
}

export default function AddCategoryModal() {
    const dispatch = useDispatch<AppDispatch>();
    const [categoryName, setCategoryName] = useState("");


    const router = useRouter();

    const adminId = useAppSelector((state) => state.users.admin.adminId);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!adminId) {
            console.error('Attempt to create a category w/o adminId');
            return;
        }
        const category = new Category(categoryName, adminId);
        dispatch(onCreateCategory(category));
        router.push('/images', { scroll: false })
    };

    return (
        <>
            <div className="modal add-new-user-modal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New category</h5>
                            <Link href="/images" className="btn btn-light">&times;</Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="">Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-secondary">
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
