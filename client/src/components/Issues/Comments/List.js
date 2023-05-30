import React from 'react'

function List( props ) {
    const { Comments } = props
  return (
    <> 
    <div
    className='flex items-center justify-center mt-8 h-auto max-h-[2em]'
    >
        <ul>
            {
            Comments.map(c => (

            <li key={c?._id}>
                {c?.comment}
            </li>
   
            
            ))}
        </ul>
    </div>
    </>
  )
}

export default List