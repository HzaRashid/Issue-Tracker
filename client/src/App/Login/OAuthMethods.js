import { 
    RiGoogleFill,
    RiGithubFill,
    RiMicrosoftFill
   } from 'react-icons/ri'



const GoogleLink =  process.env.REACT_APP_API_AuthGoogle
const GithubLink =  process.env.REACT_APP_API_AuthGithub
const MSFTLink =    process.env.REACT_APP_API_AuthMicrosoft

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