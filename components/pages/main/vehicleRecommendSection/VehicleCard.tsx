import Image from "next/image";
import { mainVehicleCardType } from "@/types/eventBannerType";
import style from "@/components/pages/main/vehicleRecommendSection/VehicleCard.module.css";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useState } from "react";

export default function VehicleCard(props: { item: mainVehicleCardType }) {

  const router = useRouter();
  const [active, setActive] = useState<boolean>(false);
  const handleActive = () => {
    setActive(!active);
  }
  const data = props.item;
  const handleOpenCarDetail = () => {
    router.push(`/car/${data.vehicleId}`)
  }
  
  return (
    <>
      <div className={style.card} onClick={()=> handleOpenCarDetail()}>
        <div className={style.carWrap}>
          <Image
            src={data.carImage}
            width={300}
            height={300}
            alt={data.carName}
            priority
          />
        </div>
        <IconButton sx={{position:'absolute', right:'1rem'}} onClick={handleActive}>
          {
            active ? <BookmarkAddedIcon sx={{ color: '#00c4df'}} /> : <BookmarkAddOutlinedIcon />
          }
        </IconButton>
        <div className={style.carTitle}  onClick={()=>router.push(`/car/${data.vehicleId}`)} >{data.carName}</div>
        <div className={style.greySubTitle}>{data.billitaZoneName}</div>
      </div>
    </>
  );
}
