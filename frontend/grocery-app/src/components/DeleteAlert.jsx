import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>

        <div className='flex justify-end mt-6'>
            <button
                type="button"
                className='bg-purple-400 border rounded-2xl p-[5px]'
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