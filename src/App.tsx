import Dashboard from "./Dashboard";
import Header from "./Header";
import Settings from "./Settings";
import "./App.scss";
import { useEffect, useState } from "react";
import { LightRoom } from "./types/light-room";

function App() {
  const [lightRooms, setLightRooms] = useState<LightRoom[]>([]);
  const [selectedLights, setSelectedLights] = useState<LightRoom[]>([]);

  useEffect(() => {
    (async () => {
      const lightRooms: LightRoom[] = (await import("./testdata/light-rooms.json"))
        .default;
      setLightRooms(lightRooms);
    })();
  }, []);

  useEffect(() => {
    const selectedLight: LightRoom[] = lightRooms.filter(
      (lightRoom) => lightRoom.checked
    );

    setSelectedLights(selectedLight);
  }, [lightRooms]);

  function handleLightChange(roomId: number, room: LightRoom) {
    setLightRooms((lightRooms) =>
      lightRooms.map((lightRoom) => {
        return lightRoom.id === roomId ? { ...room } : lightRoom;
      })
    );
  }

  function handleAllSelectedLightChange(room: Partial<LightRoom>) {
    setLightRooms((lightRooms) => {
      return lightRooms.map((lightRoom) => {
        const inSelectedList = selectedLights.some(
          (selectedLightRoom) => selectedLightRoom.id === lightRoom.id
        );
        return inSelectedList ? { ...lightRoom, ...room } : lightRoom;
      });
    });
    setSelectedLights((selectedLights) =>
      selectedLights.map((oldRoom) => ({ ...oldRoom, ...room }))
    );
  }

  function handleallLightChange(room: Partial<LightRoom>) {
    setLightRooms((lightRooms) =>
      lightRooms.map((lightRoom) => ({ ...lightRoom, ...room }))
    );
  }

  function handleAddLightRoom() {
    const id = lightRooms.length + 1;
    setLightRooms((oldlightRooms) => [
      ...oldlightRooms,
      {
        brightness: 100,
        enabled: true,
        checked: false,
        id,
      },
    ]);
  }

  return (
    <main className="main">
      <Header onAddRoom={handleAddLightRoom} />
      <div className="main__workplace">
        <Settings
          selectedLights={selectedLights}
          onAllSelectedLightChange={handleAllSelectedLightChange}
          onAllLightChange={handleallLightChange}
        />
        <Dashboard lightRooms={lightRooms} onRoomChange={handleLightChange} />
      </div>
    </main>
  );
}

export default App;
