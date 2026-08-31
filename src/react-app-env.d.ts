/// <reference types="react-scripts" />
declare module "ethereum-blockies" {
  const blockies: any; // 根据需要调整类型
  export = blockies;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

declare module "*.ogg" {
  const src: string;
  export default src;
}
