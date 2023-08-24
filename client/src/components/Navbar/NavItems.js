import React from 'react'
import * as AiIcons from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { MdError } from "react-icons/md";
import { BsFillCalendarRangeFill } from "react-icons/bs";

const iconStyle={ fontSize: 22.5 };

export const NavItems = [
    {
        title: 'Home',
        icon: <AiIcons.AiFillHome style={iconStyle}/>,
        link: '/home',

    },
    {
        title: 'Projects',
        icon: <BsFillCalendarRangeFill style={iconStyle}/>,
        link: '/projects',
  

    },
    {
        title: 'Issues',
        icon: <MdError style={iconStyle}/>,
        link: '/issues',
       

    },
    {
        title: 'Users',
        icon: <IoMdPeople style={iconStyle}/>,
        link: '/team',
       

    },
    {
        title: 'Profile',
        icon: <FaUser style={iconStyle}/>,
        link: '/profile',
   
        
    }

]