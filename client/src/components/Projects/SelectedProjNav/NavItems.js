import React from 'react'
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { SprintContexts } from '../../../contexts/SprintContexts'
import { MdViewKanban } from 'react-icons/md';
import { CgStack } from 'react-icons/cg';
import { BiSolidGroup } from 'react-icons/bi';

const iconStyle={ color: "#404040", fontSize: 22.5 };

export const WhtSpace = (string) => string?.replace(' ', '%20')

export const NavItems = () => {

    const { SelectedProj } = ProjContexts();
    const { SelectedSprint } = SprintContexts();
    
    return (
    [
        {
            title: 'Backlog',
            icon: <CgStack style={iconStyle}/>,
            link: `/projects/${WhtSpace(SelectedProj?.title)}/backlog/proj-nav=true`
        },
        {
            title: 'Boards',
            icon: <MdViewKanban style={iconStyle}/>,
            // link: `/projects/${WhtSpace(SelectedProj?.title)}/${WhtSpace(SelectedSprint?.title)}/proj-nav=true`
        },
        {
            title: 'Team',
            icon: <BiSolidGroup style={iconStyle}/>,
            link: `/projects/${WhtSpace(SelectedProj?.title)}/team/proj-nav=true`
        },

    ]
)
}