import React from 'react'
import {styled} from '@mui/material/styles';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import Image from 'next/image'
import { Box } from '@mui/material';

export default function ProgressBar(props: { value: number }) {

    return (
      <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ width: '50%'}} my={1}>
        <Image src="/assets/images/icons/harrypotter.svg" alt="harrypotter" width={10} height={10}/>
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
