type AppleStartupDevice = {
  width: number
  height: number
  dpr: number
  portrait: string
  landscape: string
}

const devices: AppleStartupDevice[] = [
  {
    width: 320,
    height: 568,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-iphone_se_ipod_touch-640_x_1136.png",
    landscape: "/apple-splash/splash-landscape-iphone_se_ipod_touch-1136_x_640.png",
  },
  {
    width: 375,
    height: 667,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-iphone_8-iphone_se-750_x_1334.png",
    landscape: "/apple-splash/splash-landscape-iphone_8-iphone_se-1334_x_750.png",
  },
  {
    width: 414,
    height: 736,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_8_plus-iphone_7_plus-1242_x_2208.png",
    landscape: "/apple-splash/splash-landscape-iphone_8_plus-iphone_7_plus-2208_x_1242.png",
  },
  {
    width: 375,
    height: 812,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_13_mini-iphone_x-1125_x_2436.png",
    landscape: "/apple-splash/splash-landscape-iphone_13_mini-iphone_x-2436_x_1125.png",
  },
  {
    width: 390,
    height: 844,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_14-iphone_13-iphone_12-1170_x_2532.png",
    landscape: "/apple-splash/splash-landscape-iphone_14-iphone_13-iphone_12-2532_x_1170.png",
  },
  {
    width: 393,
    height: 852,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_16-iphone_15_pro-iphone_14_pro-1179_x_2556.png",
    landscape: "/apple-splash/splash-landscape-iphone_16-iphone_15_pro-iphone_14_pro-2556_x_1179.png",
  },
  {
    width: 402,
    height: 874,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_17_pro-iphone_17-iphone_16_pro-1206_x_2622.png",
    landscape: "/apple-splash/splash-landscape-iphone_17_pro-iphone_17-iphone_16_pro-2622_x_1206.png",
  },
  {
    width: 414,
    height: 896,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-iphone_11-iphone_xr-828_x_1792.png",
    landscape: "/apple-splash/splash-landscape-iphone_11-iphone_xr-1792_x_828.png",
  },
  {
    width: 414,
    height: 896,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_11_pro_max-iphone_xs_max-1242_x_2688.png",
    landscape: "/apple-splash/splash-landscape-iphone_11_pro_max-iphone_xs_max-2688_x_1242.png",
  },
  {
    width: 420,
    height: 912,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_air-1260_x_2736.png",
    landscape: "/apple-splash/splash-landscape-iphone_air-2736_x_1260.png",
  },
  {
    width: 428,
    height: 926,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_14_plus-iphone_13_pro_max-1284_x_2778.png",
    landscape: "/apple-splash/splash-landscape-iphone_14_plus-iphone_13_pro_max-2778_x_1284.png",
  },
  {
    width: 430,
    height: 932,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_16_plus-iphone_15_pro_max-iphone_14_pro_max-1290_x_2796.png",
    landscape: "/apple-splash/splash-landscape-iphone_16_plus-iphone_15_pro_max-iphone_14_pro_max-2796_x_1290.png",
  },
  {
    width: 440,
    height: 956,
    dpr: 3,
    portrait: "/apple-splash/splash-portrait-iphone_17_pro_max-iphone_16_pro_max-1320_x_2868.png",
    landscape: "/apple-splash/splash-landscape-iphone_17_pro_max-iphone_16_pro_max-2868_x_1320.png",
  },
  {
    width: 768,
    height: 1024,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-ipad_9.7_mini-1536_x_2048.png",
    landscape: "/apple-splash/splash-landscape-ipad_9.7_mini-2048_x_1536.png",
  },
  {
    width: 810,
    height: 1080,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-ipad_10.2-1620_x_2160.png",
    landscape: "/apple-splash/splash-landscape-ipad_10.2-2160_x_1620.png",
  },
  {
    width: 820,
    height: 1180,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-ipad_air_10.9-1640_x_2360.png",
    landscape: "/apple-splash/splash-landscape-ipad_air_10.9-2360_x_1640.png",
  },
  {
    width: 834,
    height: 1112,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-ipad_air_10.5-1668_x_2224.png",
    landscape: "/apple-splash/splash-landscape-ipad_air_10.5-2224_x_1668.png",
  },
  {
    width: 834,
    height: 1194,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-ipad_pro_11_10.5-1668_x_2388.png",
    landscape: "/apple-splash/splash-landscape-ipad_pro_11_10.5-2388_x_1668.png",
  },
  {
    width: 834,
    height: 1210,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-ipad_pro_m4_11-1668_x_2420.png",
    landscape: "/apple-splash/splash-landscape-ipad_pro_m4_11-2420_x_1668.png",
  },
  {
    width: 744,
    height: 1133,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-ipad_mini_8.3-1488_x_2266.png",
    landscape: "/apple-splash/splash-landscape-ipad_mini_8.3-2266_x_1488.png",
  },
  {
    width: 1024,
    height: 1366,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-ipad_pro_12.9-2048_x_2732.png",
    landscape: "/apple-splash/splash-landscape-ipad_pro_12.9-2732_x_2048.png",
  },
  {
    width: 1032,
    height: 1376,
    dpr: 2,
    portrait: "/apple-splash/splash-portrait-ipad_pro_m4_13-2064_x_2752.png",
    landscape: "/apple-splash/splash-landscape-ipad_pro_m4_13-2752_x_2064.png",
  },
]

export const appleStartupImages = devices.flatMap((device) => [
  {
    href: device.portrait,
    media: `(device-width: ${device.width}px) and (device-height: ${device.height}px) and (-webkit-device-pixel-ratio: ${device.dpr}) and (orientation: portrait)`,
  },
  {
    href: device.landscape,
    media: `(device-width: ${device.width}px) and (device-height: ${device.height}px) and (-webkit-device-pixel-ratio: ${device.dpr}) and (orientation: landscape)`,
  },
])
