import { carListBrandType, carListbyBrandDataType } from "@/types/carDataType";
import style from "./CarList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ui/ProgressBar";
import { useSetRecoilState } from "recoil";
import { redirectionUrlState } from "@/state/redirectionState";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import DataLoader from "@/components/ui/DataLoader";

export default function CarListInfiniteScroll(props:{ }) {
  
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { brandId, brandName, lat, lng } = router.query;
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<string>("20");
  const [contentsData, setContentsData] = useState<carListBrandType>();
  const [carList, setCarList] = useState<carListbyBrandDataType[]>([] as carListbyBrandDataType[]);

  const setUrlSettion = useSetRecoilState(redirectionUrlState)
  const handleOpenCarDetail = (vehicleId: number) => {
    setUrlSettion({ redirectUrl: router.asPath })
    router.push(`/car/${vehicleId}`);
  };


  useEffect(() => {
    if( brandId && page && size && lat && lng ) {
    const getData = async () => {
      const res = await fetch(`${API_URL}/carbrand/maker/${brandId}?lat=${lat}&lng=${lng}&page=${page}&size=${size}`);
      const data = await res.json();
      setContentsData(data);
      setCarList([...carList, ...data.content])
    }
    getData();
    }
  }, [brandId, page, size, lat, lng, API_URL, carList])

  const handleGetMoreData = () =>{
    setPage(page+1);
  }

  return (
    <>
      <div className={style.listHeader}>
        <div className={style.listTitle}>
          <span>빌리타</span>에서 빌려타는 기회!
          {
            contentsData === undefined ? null : <div className={style.description}><span>{carList && carList.length}</span>대의 <span>{brandName}</span>차량이 대기중입니다</div>
          }
        </div>
      </div>
      <div className={style.listBody}>
        <InfiniteScroll
          dataLength={carList?.length}
          next={handleGetMoreData}
          hasMore={contentsData?.last !== true}
          loader={<GetLoader/>}
        >
        { carList && carList?.map((item:carListbyBrandDataType) => {
          return (
            <div
              key={item.vehicleId}
              className={style.cardItem}
              onClick={() => handleOpenCarDetail(item.vehicleId)}
            >
              <div className={style.cardItemText}>
                <div className={style.cardItemTitle}>{item.carName}</div>
                <ProgressBar value={item.charge} />
                <div className={style.price}>
                  {item.defaultPrice.toLocaleString("ko")}원/<span>시간당</span>
                </div>
                <div className={style.distancePrice}>
                  <span>추가거리</span>{" "}
                  {item.distancePrice.toLocaleString("ko")}원/km
                </div>
              </div>
              <div className={style.cardItemImg}>
                <div className={style.badge}>{item.billitaZone}</div>
                <div className={style.imgWrap}>
                  <Image
                    src={item.imageUrl}
                    alt={item.carName}
                    width={400}
                    height={400}
                    priority={true}
                  />
                </div>
              </div>
            </div>
          );
        })}
        </InfiniteScroll>
      </div>
    </>
  );
}

const GetLoader = () => {
  return (
    <div style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center'}}>
      <DataLoader/>
    </div>
  )
}