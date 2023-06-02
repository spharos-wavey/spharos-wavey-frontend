import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

export default function CloseBtn(props:{color?:string, align?:string}) {

  const router = useRouter();
  const { cid } = router.query;
  const handleClose = () => {
    router.push(`/car/${cid}`);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '2rem',
      left: props.align === 'left' ? '2rem' : 'unset',
      right: props.align === 'right' ? '2rem' : 'unset',
      cursor: 'pointer',
      zIndex: 100
    }}
      onClick={handleClose}
    >
      <Image src="/assets/images/icons/close.svg" alt="closeBtn" width={35} height={35} />
    </div>
  )
}
