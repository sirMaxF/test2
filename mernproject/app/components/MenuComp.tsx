'use client'
import Link from 'next/link'
import React from 'react'

const MenuComp = () => {
    return (
        <nav className="menu w-full absolute top-0 left-0 bg-red-200 py-7 px-5">
            <div className="menu__item bg-cover w-20 h-5" style={{ backgroundImage: `url('/next.svg')` }}></div>
            <div className="menu__item">Домой</div>
            <div className="menu__item">Фильмы</div>
            <div className="menu__item">Сериалы</div>
            {/* <Link
                href='/'
                className="menu__item background-image: url('/public/next.svg') bg-cover w-10 h-5"
            >
            </Link>
            <Link
                href='/'
            >Домой</Link>
            <Link
                href='/series'
            ></Link> */}
        </nav >
    )
}

export default MenuComp