export const getContrastColor = (hexColor?: string): string => {
  if (!hexColor) return "#000000"; // черный по умолчанию

  // Убираем # если он есть
  const hex = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;

  // Проверяем длину (должно быть 3 или 6)
  if (hex.length !== 3 && hex.length !== 6) {
    console.warn("Invalid hex color format for getContrastColor:", hexColor);
    return "#000000";
  }

  let rStr, gStr, bStr;
  if (hex.length === 3) {
    rStr = hex.slice(0, 1) + hex.slice(0, 1);
    gStr = hex.slice(1, 2) + hex.slice(1, 2);
    bStr = hex.slice(2, 3) + hex.slice(2, 3);
  } else {
    rStr = hex.slice(0, 2);
    gStr = hex.slice(2, 4);
    bStr = hex.slice(4, 6);
  }

  const r = parseInt(rStr, 16);
  const g = parseInt(gStr, 16);
  const b = parseInt(bStr, 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.warn("Failed to parse hex color for getContrastColor:", hexColor);
    return "#000000";
  }

  // http://www.w3.org/TR/AERT#color-contrast
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? "#000000" : "#FFFFFF"; // черный или белый
};
