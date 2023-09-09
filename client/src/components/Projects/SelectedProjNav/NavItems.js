import React from 'react'
import { ProjContexts } from '../../../contexts/ProjectContexts';
// import { SprintContexts } from '../../../contexts/SprintContexts'
import { MdViewKanban } from 'react-icons/md';
import { CgStack } from 'react-icons/cg';
import { BiSolidGroup } from 'react-icons/bi';

const iconStyle={ color: "#404040", fontSize: 22.5 };

export const WhtSpace = (string) => string?.replace(' ', '%20')

export const NavItems = () => {

    const { SelectedProj } = ProjContexts();
    // const { SelectedSprint } = SprintContexts();
    
    return (
    [
        {
            title: 'Backlog',
            icon: <CgStack style={iconStyle}/>,
            link: `/project-page/${WhtSpace(SelectedProj?.title)}/backlog/`
        },
        {
            title: 'Boards',
            icon: <MdViewKanban style={iconStyle}/>,
        },
        {
            title: 'Team',
            icon: <BiSolidGroup style={iconStyle}/>,
            link: `/project-page/${WhtSpace(SelectedProj?.title)}/team/`
        },

    ]
)
}