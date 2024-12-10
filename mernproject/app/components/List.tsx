import React from 'react'

const List = ({ list }: ListProps) => {
    return (
        <div className="w-80 group">
            <div className="h-28 bg-slate-600"></div>
            <div className="h-10 bg-red-400 flex justify-between items-center px-5">
                <div className="group-hover:bg-amber-700 w-full">{list.title}</div>
                <div className="w-full">{list.genre}</div>
            </div>

        </div>
    )
}

export default List