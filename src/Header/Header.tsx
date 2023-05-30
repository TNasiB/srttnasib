import "./Header.scss";

const Header = (props: { onAddRoom: () => void }) => (
  <header className="header">
    <h1>Система управления освещением</h1>
    <span>Насибуллин Т.И. ИВТ-324</span>
    <button onClick={props.onAddRoom}>Add</button>
  </header>
);

export default Header;
