import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from "./cameraScroller.module.scss";
import { Position } from "../../types/position";

interface Props {
  playerPosition: Position;
   mapRef: React.RefObject<HTMLDivElement | null>;
}

const CameraScroller = ({playerPosition, mapRef}: Props) => {
  const [getCurrentMapWidth, setGetCurrentMapWidth] = useState<number>(0);
  const [getCurrentMapHeight, setGetCurrentMapHeight] = useState<number>(0);
  const cameraRef = useRef<HTMLDivElement>(null); // this component on DOM
  const [getCurrentCamerapWidth, setgetCurrentCamerapWidth] = useState<number>(0);
  const [getCurrentCameraHeight, setgetCurrentCameraHeight] = useState<number>(0);


  useEffect(() => {
    const getMapDimensions = () => {
      if (mapRef.current) {
        const computedMap = window.getComputedStyle(mapRef.current);
        setGetCurrentMapWidth(parseInt(computedMap.width));
        setGetCurrentMapHeight(parseInt(computedMap.height));
      }
    }
    getMapDimensions();
  }, [mapRef.current])

  useEffect(() => {
  const getCameraDimension = () => {
    if (cameraRef.current) {
      const computedMap = window.getComputedStyle(cameraRef.current);
      setgetCurrentCamerapWidth(parseInt(computedMap.width));
      setgetCurrentCameraHeight(parseInt(computedMap.height));
    }
  }
    getCameraDimension();
  }, [cameraRef.current])


  useEffect(() => {
    console.log('getCurrentMapWidth:', getCurrentMapWidth);
    console.log('getCurrentMapHeight:', getCurrentMapHeight);

    console.log('getCurrentCamerapWidth:', getCurrentCamerapWidth);
    console.log('getCurrentCameraHeight:', getCurrentCameraHeight);
  }, [getCurrentMapWidth,
    getCurrentMapHeight,
    getCurrentCamerapWidth,
    getCurrentCameraHeight
  ])

  return (
  <div
  ref={cameraRef}
  className={clsx(style.camera)}>
  </div>
  )
}

export default CameraScroller;
