import React from 'react'
import { BsStack } from "react-icons/bs";
import { HiViewBoards } from "react-icons/hi";
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { SprintContexts } from '../../../contexts/SprintContexts'
const iconStyle={ color: "#404040", fontSize: 22.5 };



export const WhtSpace = (string) => string?.replace(' ', '%20')
    

export const NavItems = () => {

    const { SelectedProj } = ProjContexts();
    const { SelectedSprint } = SprintContexts();
    
    return (
    [
        {
            title: 'Backlog',
            icon: <BsStack style={iconStyle}/>,
            link: `/projects/${WhtSpace(SelectedProj?.title)}/backlog`
        },
        {
            title: 'Board',
            icon: <HiViewBoards style={iconStyle}/>,
            link: `/projects/${WhtSpace(SelectedProj?.title)}/${WhtSpace(SelectedSprint?.title)}`
    

        },

    ]
)
}