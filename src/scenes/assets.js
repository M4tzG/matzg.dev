
export function assets() {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return [
    // home
    ["Raposo", `${basePath}/assets/homeAssets/fox_default.png`],
    ["backgroundX", `${basePath}/assets/homeAssets/backgroundX.png`],
    ["leftDots", `${basePath}/assets/homeAssets/leftDots.png`],
    ["rightDots", `${basePath}/assets/homeAssets/rightDots.png`],

    ["leftRect", `${basePath}/assets/homeAssets/leftRect.png`],
    ["middleRect", `${basePath}/assets/homeAssets/middleRect.png`],
    ["rightRect", `${basePath}/assets/homeAssets/rightRect.png`],

    ["backgroundFlower", `${basePath}/assets/homeAssets/backgroundFlower.png`],
    ["pinkFlower", `${basePath}/assets/homeAssets/pinkFlower.png`],
    ["purpleBlueFlower", `${basePath}/assets/homeAssets/purpleBlueFlower.png`],

    // chain
    ["chainLinkEvenFull", `${basePath}/assets/homeAssets/chain/chainLinkEvenFull.png`],
    ["chainLinkEvenBack", `${basePath}/assets/homeAssets/chain/chainLinkEvenBack.png`],
    ["chainLinkEvenFront", `${basePath}/assets/homeAssets/chain/chainLinkEvenFront.png`],

    ["chainLinkOddFull", `${basePath}/assets/homeAssets/chain/chainLinkOddFull.png`],
    ["chainLinkOddFront", `${basePath}/assets/homeAssets/chain/chainLinkOddFront.png`],
    ["chainLinkOddBack", `${basePath}/assets/homeAssets/chain/chainLinkOddBack.png`],

    // projects
    ["witSpriteSheet", `${basePath}/assets/projectsAssets/witSpriteSheet.png`],
    ["witImage", `${basePath}/assets/projectsAssets/witImage.png`],
  ];

}