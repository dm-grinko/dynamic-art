
import { onDeleteCategory, sendCategoryImages } from '@/services/category.service';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { AppDispatch, useAppSelector } from '@/redux/store';

export default function Category({ category }: any) {
    const adminId = useAppSelector((state) => state.users.admin.adminId);
    const [files, setFiles] = useState<File[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const deleteCategory = () => {
        if (adminId) {
            dispatch(onDeleteCategory(category.categoryId, adminId));
        }
    }

    const uploadImages = (e: any) => {
        e.preventDefault();
        if (adminId) {
            const formData = new FormData();
            formData.append('adminId', adminId);
            formData.append('categoryId', category.categoryId);
            for (const file of files) {
                formData.append('files', file);
            }
            dispatch(sendCategoryImages(formData));
        } else {
            console.error('Attempt to send an image w/o adminId')
        }
    };

    return (
        <div className="card" style={{ 'width': '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{category.categoryName}</h5>
                <p className="card-text">Images: {category.imageCount}</p>
                <form>
                    <div className="modal-body">
                        <div className="input-group">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    multiple
                                    onChange={(e) => setFiles([...e.target.files as unknown as File[]])}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <br />
                <br />
                <button onClick={uploadImages} className="btn btn-secondary">Upload Images</button>
                <br />
                <br />
                <button onClick={deleteCategory} className="btn btn-secondary">Delete category</button>
            </div>
        </div>
    );
}