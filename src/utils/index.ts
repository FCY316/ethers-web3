import blockies from "ethereum-blockies";
type DecimalInput = bigint | string | number;
type ReturnType = "string" | "number";

// 数据脱敏
export const mobileHidden = (
  value: string,
  start: number = 10,
  end: number = 4,
  d: number = 3,
) => {
  const n = start - 1 + d;
  if (value) {
    const valueArray = value.split("");
    for (let i = start; i < valueArray.length - end; i++) {
      valueArray[i] = ".";
      if (i > n) {
        valueArray[i] = "";
      }
    }
    return valueArray.join("");
  }
  return "";
};
// 复制函数
export const handleCopyClick = (data: string | number) => {
  try {
    data = data + "";
    const textField = document.createElement("textarea");
    textField.innerText = data;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// ，如果等于0那么就显示0，如果大于0就保留两位小数+..
export const formatNumber = (
  value: string,
  digits: number = 4,
  d: string = "",
): string => {
  if (!Number(value)) return "0";
  // 将输入值转换为字符串
  const stringValue = String(value);
  // 将字符串转换为数字，如果无法解析则返回原始字符串
  const numericAmount = parseFloat(stringValue);
  // 检查输入是否为有效的数字
  if (isNaN(numericAmount)) {
    return stringValue; // 如果无法解析为有效数字，则返回原始输入
  }
  // 使用将小数位数限制为两位，然后转换为字符串
  const cleanedAmount = truncateDecimal(value, digits) + "";
  // 检查小数位数是否超过两位，如果超过，则添加省略号
  const decimalCount = ((numericAmount + "").split(".")[1] || "").length;
  if (decimalCount > digits) {
    return cleanedAmount + d;
  }
  return cleanedAmount;
};

export function truncateDecimal(
  value: DecimalInput,
  digits?: number,
  returnType?: "string",
): string;
export function truncateDecimal(
  value: DecimalInput,
  digits: number,
  returnType?: "number",
): number;
export function truncateDecimal(
  value: DecimalInput,
  digits = 6,
  returnType: ReturnType = "string",
): string | number {
  if (!Number.isInteger(digits) || digits < 0) {
    throw new RangeError("digits 必须是大于等于 0 的整数");
  }

  const raw =
    typeof value === "bigint" ? value.toString() : String(value).trim();

  // 支持普通十进制格式，例如：1、1.2、.2、-0.01
  const match = raw.match(/^([+-]?)(\d*)(?:\.(\d*))?$/);
  if (!match || (!match[2] && !match[3])) {
    throw new TypeError(`无效的十进制值: ${raw}`);
  }

  const [, sign, rawInteger = "", rawFraction = ""] = match;
  const integer = (rawInteger || "0").replace(/^0+(?=\d)/, "");
  const fraction = rawFraction.slice(0, digits).replace(/0+$/, "");

  // 避免产生 "-0"
  const isZero = integer === "0" && !fraction;
  const result = isZero
    ? "0"
    : `${sign === "-" ? "-" : ""}${integer}${fraction ? `.${fraction}` : ""}`;

  return returnType === "number" ? Number(result) : result;
}

// 通过地址生成稳定的圆形 Blockies 图像。
const addressImageCache = new Map<string, string>();
export const ethereumAddressImage = (address: string) => {
  if (typeof document === "undefined") return "";

  // 同一地址无论校验大小写如何，都使用同一个缓存键和同一套 seed。
  const seed = address.trim().toLowerCase();
  const cachedImage = addressImageCache.get(seed);
  if (cachedImage) return cachedImage;

  const canvasSize = 64;
  const blockiesCanvas = blockies.create({
    seed,
    size: 8,
    scale: 8,
    color: getBlockiesColor(seed, "foreground"),
    bgcolor: getBlockiesColor(seed, "background"),
    spotcolor: getBlockiesColor(seed, "spot"),
  });
  const circularCanvas = document.createElement("canvas");
  circularCanvas.width = canvasSize;
  circularCanvas.height = canvasSize;

  const context = circularCanvas.getContext("2d");
  if (!context) return "";

  context.beginPath();
  context.arc(canvasSize / 2, canvasSize / 2, canvasSize / 2, 0, 2 * Math.PI);
  context.clip();
  context.drawImage(blockiesCanvas, 0, 0, canvasSize, canvasSize);

  const imageDataURL = circularCanvas.toDataURL("image/png");
  addressImageCache.set(seed, imageDataURL);
  return imageDataURL;
};
// 为 blockies 指定稳定颜色。ethereum-blockies 的默认颜色在 seed 生效前生成，
// 因此不手动传色时，同一个地址的颜色会随调用次数变化。
const getBlockiesColor = (seed: string, salt: string) => {
  let hash = 2166136261;
  const value = `${seed}:${salt}`;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  const colorValue = hash >>> 0;
  const hue = colorValue % 360;
  const saturation = 45 + ((colorValue >>> 8) % 36);
  const lightness = 35 + ((colorValue >>> 16) % 26);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
