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
  
  return (
    <>
      <div className={style.card}>
        <div className={style.carWrap}>
          <Image
            src={props.item.carImage}
            width={200}
            height={90}
            alt={props.item.carName}
            priority
          />
        </div>
        <IconButton sx={{position:'absolute', right:'1rem'}}>
          {
            active ? <BookmarkAddedIcon sx={{ color: '#00c4df'}} onClick={handleActive}/> : <BookmarkAddOutlinedIcon onClick={handleActive}/>
          }
        </IconButton>
        <div className={style.carTitle}  onClick={()=>router.push(`/car/${props.item.id}`)} >{props.item.carName}</div>
        <div className={style.greySubTitle}>{props.item.pickUpArea}</div>
      </div>
    </>
  );
}
