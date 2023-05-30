import "./Dashboard.scss";
import LightRoom from "../LightRoom";
import { LightRoom as LightRoomType } from "../types/light-room";

interface DashboardProps {
  lightRooms: LightRoomType[];
  onRoomChange: (roomId: number, room: LightRoomType) => void;
}

const Dashboard = (props: DashboardProps) => (
  <div className="dashboard">
    {props.lightRooms.map((lightRoom) => (
      <LightRoom
        key={lightRoom.id}
        {...lightRoom}
        handleRoomChange={props.onRoomChange}
      />
    ))}
  </div>
);

export default Dashboard;
