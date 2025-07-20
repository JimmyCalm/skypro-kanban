export default function PopUser({ onClose }) {
  return (
    <div 
      className="header__pop-user-set pop-user-set" 
      id="user-set-target"
    >
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        x
      </a>
      <p className="pop-user-set__name">Ivan Ivanov</p>
      <p className="pop-user-set__mail">ivan.ivanov@gmail.com</p>
      <div className="pop-user-set__theme">
        <p>Темная тема</p>
        <input type="checkbox" className="checkbox" name="checkbox"></input>
      </div>
      <button 
        type="button" 
        className="_hover03"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <a href="#popExit">Выйти</a>
      </button>
    </div>
  );
}