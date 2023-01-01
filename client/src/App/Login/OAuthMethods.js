import { 
    RiGoogleFill,
    RiGithubFill,
    RiMicrosoftFill
   } from 'react-icons/ri'


const data = require('../../pages/routes.json')

const GoogleLink = data.AuthGoogle
const GithubLink = data.AuthGithub
const MSFTLink = data.AuthMicrosoft

export const OAuthMethods = [
    {
        logo: <RiGoogleFill fontSize={'2em'}/>,
        name: 'Google',
        onClick: () => { window.open(GoogleLink, "_self") }
    },
    {
        logo: <RiGithubFill fontSize={'2em'}/>,
        name: 'Github',
        onClick: () => window.open(GithubLink, "_self")
    },
    {
        logo: <RiMicrosoftFill fontSize={'2em'}/>,
        name: 'Microsoft',
        onClick: () => window.open(MSFTLink, "_self")
    }
]