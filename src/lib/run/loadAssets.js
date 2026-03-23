import AssetsManager from "../utils/AssetsManager";

export async function loadAssets() {
    const assets = new AssetsManager();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    const loadPromises = [
    // [=============================================================]  
        // home
        assets.loadTexture("Raposo", `${basePath}/assets/homeAssets/fox_default.png`),
        assets.loadTexture("backgroundX", `${basePath}/assets/homeAssets/backgroundX.png`),
        assets.loadTexture("leftDots", `${basePath}/assets/homeAssets/leftDots.png`),
        assets.loadTexture("rightDots", `${basePath}/assets/homeAssets/rightDots.png`),

        assets.loadTexture("leftRect", `${basePath}/assets/homeAssets/leftRect.png`),
        assets.loadTexture("middleRect", `${basePath}/assets/homeAssets/middleRect.png`),                          
        assets.loadTexture("rightRect", `${basePath}/assets/homeAssets/rightRect.png`),    

        assets.loadTexture("backgroundFlower", `${basePath}/assets/homeAssets/backgroundFlower.png`),
        assets.loadTexture("pinkFlower", `${basePath}/assets/homeAssets/pinkFlower.png`),
        assets.loadTexture("purpleBlueFlower", `${basePath}/assets/homeAssets/purpleBlueFlower.png`), 
        
        // chain - home
        assets.loadTexture("chainLinkEvenFull", `${basePath}/assets/homeAssets/chain/chainLinkEvenFull.png`),
        assets.loadTexture("chainLinkEvenBack", `${basePath}/assets/homeAssets/chain/chainLinkEvenBack.png`),
        assets.loadTexture("chainLinkEvenFront", `${basePath}/assets/homeAssets/chain/chainLinkEvenFront.png`),

        assets.loadTexture("chainLinkOddFull", `${basePath}/assets/homeAssets/chain/chainLinkOddFull.png`),
        assets.loadTexture("chainLinkOddFront", `${basePath}/assets/homeAssets/chain/chainLinkOddFront.png`),
        assets.loadTexture("chainLinkOddBack", `${basePath}/assets/homeAssets/chain/chainLinkOddBack.png`),

    // [=============================================================]  
        // projects
        assets.loadTexture("witSpriteSheet", `${basePath}/assets/projectsAssets/witSpriteSheet.png`),
        assets.loadTexture("witImage", `${basePath}/assets/projectsAssets/witImage.png`),

    // [=============================================================]  
    ];

    try {
        await Promise.all(loadPromises);
        console.log("assets carregados:", assets.textures);
    } catch (error) {
        console.error("assets erro", error);
        throw error;
    }

    return assets;
}