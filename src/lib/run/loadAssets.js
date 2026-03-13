import AssetsManager from "../utils/AssetsManager";

export async function loadAssets() {
    const assets = new AssetsManager();

    const loadPromises = [
        assets.loadTexture("Raposo", "/assets/fox_default.png"),
        assets.loadTexture("dots", "/assets/dots_diagonal_right.png"),
        assets.loadTexture("wit", "/assets/wit.png"),
        assets.loadTexture("chainLinkFull", "/assets/chainLinkFull.png"),
        assets.loadTexture("chainLinkBack", "/assets/chainLinkBack.png"),
        assets.loadTexture("chainLinkFront", "/assets/chainLinkFront.png")

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