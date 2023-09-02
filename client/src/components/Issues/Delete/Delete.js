import React from 'react'
import { IssueContexts } from '../../../contexts/IssueContexts';
import axios from 'axios';
const data = require('../../../pages/routes.json')
function Delete({
    age, 
    setPage, 
    setOpenDelModal, 
    prevPage,
    // setEditIssueModal,
    }) {

    const { Issues, setIssues, SelectedIssue, setEditIssueModal} = IssueContexts();
 
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
        onClick={() => {
            axios.delete(data.Issues + '/delete', {
                _id: SelectedIssue._id
            })
            .then(
                res => {
                    if (res.status === 200) {
                        var issues = Issues.slice()
                        issues = issues.filter(i => i._id !== SelectedIssue._id)
                        setIssues(issues)
            }})
            .catch(err => console.log(err))

            setTimeout(() => {
                setEditIssueModal(false)
            }, 700);

        }}

        >
            Confirm
        </button>
    </div>


    </>
  )
}

export default Delete