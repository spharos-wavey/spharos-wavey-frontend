import React from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface overlayType {
  lat: number;
  lng: number;
  onClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
  availableNumber: number;
}

export default function CustomOverlay({
  lat,
  lng,
  onClickHandler,
  availableNumber,
}: overlayType) {
  return (
    <>
      {availableNumber == 0 ? (
        ""
      ) : (
        <CustomOverlayMap
          position={{
            lat: lat,
            lng: lng,
          }}
        >
          <div
            className="label"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "70%",
              color: "white",
              backgroundColor: "var(--billita-blue)",
              textAlign: "center",
            }}
            onClick={onClickHandler}
          >
            <span style={{ fontSize: "0.9rem", lineHeight: "40px" }}>
              {availableNumber}
            </span>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}
