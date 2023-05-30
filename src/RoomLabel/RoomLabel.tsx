import { LightRoom } from "../types/light-room";
import "./RoomLabel.scss";

function RoomLabel(props: { room: LightRoom }) {
  return (
    <div
      className="room-labels__item"
      style={{ backgroundColor: props.room.brightness > 1 ? "green" : "red" }}
    >
      S{props.room.id} <b>{props.room.brightness}%</b>
    </div>
  );
}

function RoomLabelWrap(props: { rooms: LightRoom[] }) {
  return (
    <div className="room-labels">
      <span>Выбранные источники:</span>
      <div className="room-labels__list">
        {props.rooms.map((room) => (
          <RoomLabel key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default RoomLabelWrap;
