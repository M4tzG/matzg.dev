import AssetsManager from "../utils/AssetsManager";

export async function loadAssets() {
    const assets = new AssetsManager();

    const loadPromises = [
        assets.loadTexture("Raposo", "/assets/fox_default.png"),
        assets.loadTexture("dots", "/assets/dots_diagonal_right.png"),
        assets.loadTexture("wit", "/assets/wit.png"),

        assets.loadTexture("chainLinkFull", "/assets/chainLinkFull.png"),
        assets.loadTexture("chainLinkBack", "/assets/chainLinkBack.png"),
        assets.loadTexture("chainLinkFront", "/assets/chainLinkFront.png"),

        assets.loadTexture("chainLinkFull_variation", "/assets/chainLinkFull_variation.png"),
        assets.loadTexture("chainLinkBack_variation", "/assets/chainLinkBack_variation.png"),
        assets.loadTexture("chainLinkFront_variation", "/assets/chainLinkFront_variation.png"),

        assets.loadTexture("chainLinkFull_link", "/assets/chainLinkFull_link.png"),
        assets.loadTexture("chainLinkBack_link", "/assets/chainLinkBack_link.png"),
        assets.loadTexture("chainLinkFront_link", "/assets/chainLinkFront_link.png"),

        assets.loadTexture("chainLinkFull_link_variation", "/assets/chainLinkFull_link_variation.png"),
        assets.loadTexture("chainLinkBack_link_variation", "/assets/chainLinkBack_link_variation.png"),
        assets.loadTexture("chainLinkFront_link_variation", "/assets/chainLinkFront_link_variation.png"),




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