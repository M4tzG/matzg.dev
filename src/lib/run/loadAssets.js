import AssetsManager from "../utils/AssetsManager";

/**
 * @param {Array<[string, string]>} assetsToLoad 
 * @returns {Promise<AssetsManager>}
 */
export async function loadAssets(assetsToLoad) {
    const assets = new AssetsManager();

    const loadPromises = assetsToLoad.map(([name, path]) =>
        assets.loadTexture(name, path)
    );
    try {
        await Promise.all(loadPromises);
        console.log("assets carregados:", assets.textures);
    } catch (error) {
        console.error("assets erro", error);
        throw error;
    }

    return assets;
}