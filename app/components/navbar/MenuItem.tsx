"use client";

interface MenuItemProps {
    Onclick : () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ( {
    Onclick,
    label
    }) => {
  return (
    <div
    onClick={Onclick}
    className="px-4 py-3 transition font-semibold hover:bg-neutral-100"
    >
        {label}

    </div>
  )
}

export default MenuItem