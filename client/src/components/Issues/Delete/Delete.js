import React from 'react'

function Delete( {Page, setPage, setOpenDelModal, prevPage} ) {
  return (
    <> 

    <div className='flex items-center justify-center mt-10'>
        <p className='text-[0.95em] text-[#303030]'> Are you sure you want to delete this issue? </p>
    </div>
    <div className='flex items-center justify-center space-x-16 text-[#803A3A] mt-2'>
        <button 
        className='p-1 hover:bg-[#00000010] rounded '
        onClick={() => {
            setOpenDelModal(false);
            setPage(prevPage)
        }}>
            Cancel
        </button>
        <button
        className='p-1 hover:bg-[#00000010] rounded'
        >
            Confirm
        </button>
    </div>


    </>
  )
}

export default Delete