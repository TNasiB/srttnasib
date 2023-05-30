import { LightRoom as LightRoomType } from "../types/light-room";
import "./LightRoom.scss";
import timerIcon from "../assets/timer.svg";
import tumblerIcon from "../assets/tumbler.png";
import lightIcon from "../assets/light.svg";
import { ChangeEvent, useEffect, useState } from "react";

type LightRoomProps = LightRoomType & {
  handleRoomChange: (roomId: number, room: LightRoomType) => void;
};

const LightRoom = (props: LightRoomProps) => {
  const [lightPowerStyle, setLightPowerStyle] = useState("");
  const [lightEnabled, setLightEnabled] = useState(props.brightness > 0);

  useEffect(() => {
    setLightPowerStyle(
      `drop-shadow(0px 0px 40px rgba(238, 254, 4, ${props.brightness / 100}))`
    );
  }, [props.brightness]);

  function handleSelectLight() {
    props.handleRoomChange(props.id, { ...props, checked: !props.checked });
  }

  function handleBrightnessChange(brightness: number) {
    props.handleRoomChange(props.id, { ...props, brightness });
  }

  function handleLightToggle() {
    setLightEnabled(!lightEnabled);
    const value = !lightEnabled ? 100 : 0;
    handleBrightnessChange(value);
  }

  function setTimer() {
    const seconds = prompt(
      `Через сколько ${
        lightEnabled ? "отключить" : "включить"
      } источник? (Укажите значение в секундах)`
    );

    if (!Number(seconds)) {
      return alert("Неправильное значение");
    }

    setTimeout(() => {
      handleLightToggle();
      alert(
        `Source ${props.id} был ${lightEnabled ? "отключен" : "включен"} по таймеру!`
      );
    }, Number(seconds) * 1000);
  }

  return (
    <div className="light-room">
      <div className="light-room__header">
        <label>
          <input
            className="light-room__selected"
            type="checkbox"
            checked={props.checked}
            onChange={handleSelectLight}
          />
          <span>Source {props.id}</span>
        </label>
        <button className="light-room__timer" onClick={setTimer}>
          <img src={timerIcon} />
        </button>
        <button
          className="light-room__tumbler"
          style={{ backgroundColor: lightEnabled ? "red" : "green" }}
          onClick={handleLightToggle}
        >
          <img src={tumblerIcon} />
        </button>
      </div>
      <div>
        <img
          className="light-room__light"
          src={lightIcon}
          style={{ filter: lightPowerStyle }}
        />
      </div>
      <input
        value={props.brightness}
        className="light-room__range"
        type="range"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleBrightnessChange(Number(e.target.value))
        }
      />
    </div>
  );
};

export default LightRoom;
