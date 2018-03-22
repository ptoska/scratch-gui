import ScratchStorage from 'scratch-storage';

import defaultProjectAssets from './default-project';

const PROJECT_SERVER = 'http://us-aws.ucodemy.com';
const ASSET_SERVER = 'https://cdn.assets.scratch.mit.edu';

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
class Storage extends ScratchStorage {
    constructor () {
        super();
        this.addWebSource(
            [this.AssetType.Project],
            projectAsset => {
                const assetId = projectAsset.assetId+'';
                const [projectId, revision] = assetId.split('.');
                return revision ?
                    `${PROJECT_SERVER}/internalapi/project/${projectId}/get.php` :
                    `${PROJECT_SERVER}/internalapi/project/${projectId}/get.php`;
            }
        );
        this.addWebSource(
            [this.AssetType.ImageVector, this.AssetType.ImageBitmap, this.AssetType.Sound],
            asset => `${ASSET_SERVER}/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`
        );
        this.addWebSource(
            [this.AssetType.Sound],
            asset => `static/extension-assets/scratch3_music/${asset.assetId}.${asset.dataFormat}`
        );
        //defaultProjectAssets.forEach(asset => console.log(asset));
        /*defaultProjectAssets.forEach(asset => (asset.assetType == 'Project')?this.cache(this.AssetType[asset.assetType],
            this.DataFormat[asset.dataFormat],
            asset.data,
            asset.id
            ):this.load(this.AssetType[asset.assetType],asset.id,this.DataFormat[asset.dataFormat]));*/
    }
}

const storage = new Storage();

export default storage;
