import AssetsManager from "../utils/AssetsManager";

export async function loadAssets() {
    const assets = new AssetsManager();

    const loadPromises = [
        assets.loadTexture("Raposo", "/assets/homeAssets/fox_default.png"),
        assets.loadTexture("dots", "/assets/homeAssets/dots_diagonal_right.png"),
        assets.loadTexture("witSpriteSheet", "/assets/projectsAssets/witSpriteSheet.png"),
        assets.loadTexture("witImage", "/assets/projectsAssets/witImage.png"),

        assets.loadTexture("chainLinkEvenFull", "/assets/homeAssets/chain/chainLinkEvenFull.png"),
        assets.loadTexture("chainLinkEvenBack", "/assets/homeAssets/chain/chainLinkEvenBack.png"),
        assets.loadTexture("chainLinkEvenFront", "/assets/homeAssets/chain/chainLinkEvenFront.png"),


        assets.loadTexture("chainLinkOddFull", "/assets/homeAssets/chain/chainLinkOddFull.png"),
        assets.loadTexture("chainLinkOddFront", "/assets/homeAssets/chain/chainLinkOddFront.png"),
        assets.loadTexture("chainLinkOddBack", "/assets/homeAssets/chain/chainLinkOddBack.png"),




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