import React from 'react'
import {styled} from '@mui/material/styles';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import Image from 'next/image'
import { Box } from '@mui/material';

export default function ProgressBar(props: { value: number, isIcon? : boolean, width?: string}) {

    return (
      <Box display='flex' justifyContent='space-between' alignItems='center' sx={props.width === undefined ? { width: '50%'} : { width: props.width}} my={1}>
        { props.isIcon === undefined ? <Image src="/assets/images/icons/harrypotter.svg" alt="harrypotter" width={10} height={10}/> : null }
        <BorderLinearProgress sx={{ width: '100px'}}variant="determinate" value={props.value}/>
      </Box>
    )
}
const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundImage: `url('/assets/images/icons/harrypotter.svg')`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.mode === 'light' ? '#01c5df' : '#0055A4',
  },
}));
