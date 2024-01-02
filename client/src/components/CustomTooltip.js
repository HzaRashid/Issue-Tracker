import { Tooltip } from '@mui/material'
import { tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';


export const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} title={props?.title ? props?.title : ''}/>
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#303030',
      color: 'white',
      maxWidth: 220,
      fontSize: '0.85em',
      FontFace: "'lato', sans-serif;",
      fontWeight: 300

    },
    [`& .${tooltipClasses.arrow}`]: {
      color: '#303030',
    }
  }));