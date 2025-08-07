import PopExit from '../components/Popups/PopExit';

export default function ExitPage({ onLogout }) {
  const handleExit = () => {
    onLogout();
  };

  return (
    <div>
      <PopExit />
      <h2>Выход из аккаунта</h2>
      <button onClick={handleExit}>Подтвердить выход</button>
    </div>
  );
}