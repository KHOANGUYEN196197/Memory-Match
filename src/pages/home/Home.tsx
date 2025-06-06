import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleSelect = (size: number) => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      {/* Hình minh hoạ */}
      <div className="mb-6">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="Pokéball"
          className="w-24 h-24 animate-bounce drop-shadow-lg"
          draggable={false}
        />
      </div>

      {/* Tiêu đề */}
      <h1 className="text-4xl font-extrabold text-white mb-10 drop-shadow-md text-center">
        Chọn kích thước lưới
      </h1>

      {/* Các lựa chọn nút */}
      <div className="grid grid-cols-3 gap-8 max-w-md w-full">
        {[2, 4, 6].map((size) => (
          <button
            key={size}
            onClick={() => handleSelect(size)}
            className="
              bg-white bg-opacity-90 text-indigo-700 font-bold rounded-xl shadow-lg py-6 text-2xl
              transition-transform transform
              hover:scale-110 hover:bg-opacity-100
              focus:outline-none focus:ring-4 focus:ring-indigo-300
              active:scale-95
            "
            aria-label={`Chọn lưới ${size}x${size}`}
          >
            {size} x {size}
          </button>
        ))}
      </div>
    </div>
  );
}
