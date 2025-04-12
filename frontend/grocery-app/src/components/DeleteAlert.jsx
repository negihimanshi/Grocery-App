import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>

        <div className='flex justify-end mt-6'>
            <button
                type="button"
                className='flex items-center sm:gap-4 text-1xl sm:text-[15px] text-white py-3 px-6 rounded-lg bg-violet-500 shadow-lg shadow-purple-600/5 rounded-md hover:bg-purple-600/15 hover:text-purple-600'
                onClick={()=>{
                    console.log("Delete button clicked!");  // 🔍 Debugging log
                    if (onDelete) {
                        onDelete();  
                    } else {
                        console.error("onDelete function is undefined!");
                    }
                }}
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert