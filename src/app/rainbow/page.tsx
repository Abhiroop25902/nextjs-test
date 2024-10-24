"use client";

const charList: Array<string> = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

function generateColor() {
  let color = "#";

  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * charList.length);
    color = color.concat(charList[idx]);
  }
  console.log(color);

  return color;
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = generateColor();
}

export default function RainbowPage() {
  setTimeout(() => {
    document.body.style.transition = "background 1s ease-in-out";
  }, 10);

  return (
    <div className=" flex item-center justify-center min-h-screen">
      <button
        onClick={() => changeBackgroundColor()}
        className="px-5 py-3 bg-indigo-600 rounded-md self-center 
        hover:bg-indigo-500 font-bold
        focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        id="button"
      >
        Change Color
      </button>
    </div>
  );
}
