
import React,{ useContext } from "react";
import { RoomContext } from '../context'
import Loading from "./Loading";
import RoomFilter from './RoomsFilter'
import RoomsList from "./RoomsList";

const RoomContainer = () => {
  const { loading, setRoom, sortedRooms,rooms } = useContext(RoomContext)

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );


}

export default RoomContainer;
