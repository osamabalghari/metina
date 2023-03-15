/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'

export const DropdownMenu = (props) => {
    return (
        <div className="relative inline-block text-left group">
            <svg className="mt-2 cursor-pointer w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>

            <div className="absolute right-0 z-10 mt-1 whitespace-nowrap origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 hidden group-hover:block" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div className="py-1" role="none">
                    <div className="text-gray-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem" tabindex="-1" id="menu-item-0" onClick={props.onEdit}>Edit Team</div>
                    <div className="text-gray-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem" tabindex="-1" id="menu-item-1" onClick={props.onDelete}>Delete Team</div>
                </div>
            </div>
        </div>
    )
}