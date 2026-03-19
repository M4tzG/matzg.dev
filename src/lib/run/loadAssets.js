import AssetsManager from "../utils/AssetsManager";

export async function loadAssets() {
    const assets = new AssetsManager();

    const loadPromises = [
    // [=============================================================]  
        // home
        assets.loadTexture("Raposo", "/assets/homeAssets/fox_default.png"),
        
        assets.loadTexture("backgroundX", "/assets/homeAssets/backgroundX.png"),
        
        assets.loadTexture("leftDots", "/assets/homeAssets/leftDots.png"),
        assets.loadTexture("rightDots", "/assets/homeAssets/rightDots.png"),


        assets.loadTexture("leftRect", "/assets/homeAssets/leftRect.png"),
        assets.loadTexture("middleRect", "/assets/homeAssets/middleRect.png"),                          
        assets.loadTexture("rightRect", "/assets/homeAssets/rightRect.png"),    

        assets.loadTexture("backgroundFlower", "/assets/homeAssets/backgroundFlower.png"),
        assets.loadTexture("pinkFlower", "/assets/homeAssets/pinkFlower.png"),
        assets.loadTexture("purpleBlueFlower", "/assets/homeAssets/purpleBlueFlower.png"), 
        
        
        


        // chain - home
        assets.loadTexture("chainLinkEvenFull", "/assets/homeAssets/chain/chainLinkEvenFull.png"),
        assets.loadTexture("chainLinkEvenBack", "/assets/homeAssets/chain/chainLinkEvenBack.png"),
        assets.loadTexture("chainLinkEvenFront", "/assets/homeAssets/chain/chainLinkEvenFront.png"),


        assets.loadTexture("chainLinkOddFull", "/assets/homeAssets/chain/chainLinkOddFull.png"),
        assets.loadTexture("chainLinkOddFront", "/assets/homeAssets/chain/chainLinkOddFront.png"),
        assets.loadTexture("chainLinkOddBack", "/assets/homeAssets/chain/chainLinkOddBack.png"),



    // [=============================================================]  
        // projects
        assets.loadTexture("witSpriteSheet", "/assets/projectsAssets/witSpriteSheet.png"),
        assets.loadTexture("witImage", "/assets/projectsAssets/witImage.png"),

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