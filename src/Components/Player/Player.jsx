import { useState } from 'react';

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEdit() {
    setIsEditing((editing) => !editing); //setIsEditing(!editing) 이렇게 쓰지 않는 이유는 이전 값을 사용해야하는데 최신 버전이 아니게 된다 그래서 함수형으로 쓴다. 이런형태로 사용하면 최신값을 사용할 수 있음.
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameSlot = <span className='player-name'>{playerName}</span>;

  if (isEditing) {
    playerNameSlot = (
      <input
        type='text'
        required
        value={playerName}
        onChange={handleNameChange}
      />
    );
  }

  return (
    <>
      <li className={isActive ? 'active' : undefined}>
        <span className='player'>
          {playerNameSlot}
          <span className='player-symbol'>{symbol}</span>
        </span>
        <button onClick={handleEdit}>{!isEditing ? 'Edit' : 'Save'}</button>
      </li>
    </>
  );
}
