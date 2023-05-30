import { ChangeEvent } from "react";
import RoomLabels from "../RoomLabel";
import { LightRoom } from "../types/light-room";
import "./Settings.scss";

interface Settings {
  selectedLights: LightRoom[];
  onAllSelectedLightChange: (room: Partial<LightRoom>) => void;
  onAllLightChange: (room: Partial<LightRoom>) => void;
}

function Settings(props: Settings) {
  function handleChangeLightness(value: number) {
    props.onAllSelectedLightChange({ brightness: value });
  }

  function handleSelectAll() {
    props.onAllLightChange({ checked: true });
  }

  function handleDiselectAll() {
    props.onAllLightChange({ checked: false });
  }

  function handleToggleAll(value: number) {
    props.onAllLightChange({ brightness: value });
  }

  return (
    <aside className="settings">
      <p>Общий контроль</p>
      <RoomLabels rooms={props.selectedLights} />
      <form className="settings__form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="range"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeLightness(Number(e.target.value))
          }
        />
        <button onClick={handleSelectAll}>Select all</button>
        <button onClick={handleDiselectAll}>Diselect all</button>
        <button onClick={() => handleToggleAll(0)}>Off all</button>
        <button onClick={() => handleToggleAll(100)}>On all</button>
      </form>
    </aside>
  );
}

export default Settings;
