"use client";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/redux/store';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { setAdmin } from '@/redux/slices';
import { connectToSocket } from '@/services/websockets';

export default function Nav({ title, adminId }: { title: string, adminId: string }) {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => { dispatch(setAdmin(adminId)) }, [adminId, dispatch]);

    useEffect(() => { dispatch(connectToSocket()) }, [dispatch]);

    const pathname = usePathname();

    return (
        // <nav className={`navbar navbar-expand-lg navbar-dark navbar-custom fixed-top ${pathname === '/' ? '' : 'solid'}`}>
        <nav className={`navbar navbar-expand-lg navbar-dark navbar-custom fixed-top ${pathname === '/' ? '' : 'solid'}`}>
            <div className="container">
                <Link href="/" className="navbar-brand" >{title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">

                        {adminId && (
                            <>
                                <Link href="/images" className="pictures-nav-btn nav-link" >Images</Link>
                                <Link href="/users" className="pictures-nav-btn nav-link" >Users</Link>
                                <Link href="/show" className="pictures-nav-btn nav-link" >Show</Link>
                            </>
                        )}

                        <Link href="/about" className="pictures-nav-btn nav-link" >About</Link>

                        {!adminId && (
                            <>
                                <Link href='/sign-in' className="pictures-nav-btn nav-link">Sign In</Link>
                                {/* <Link href='/sign-up' className="pictures-nav-btn nav-link">Sign Up</Link> */}
                            </>
                        )}

                        <div className="pictures-user-btn">
                            <UserButton afterSignOutUrl='/' />
                        </div>


                    </ul>
                </div>
            </div>
        </nav>
    );
}