const { ccclass, property } = cc._decorator;

@ccclass("shareParam")
export class ShaderParameter {

    @property()
    public key: string = "";

    @property()
    public value: string = "";
}


@ccclass
export default class ShaderParamComponent extends cc.Component {

    private sprite: cc.Sprite = null;

    private _material: cc.Material = null;

    private _start = 0;

    @property({ type: [ShaderParameter], displayName: "参数列表", tooltip: "向材质传递自定义参数,参数类型会进行json转换." })
    private params: ShaderParameter[] = [];

    @property({ displayName: "更新时间", tooltip: "是否传递时间变化" })
    private timeUpdate: boolean = true;

    onLoad() {
        this.sprite = this.getComponent(cc.Sprite);
        if (this.sprite) {
            this._material = this.sprite.getMaterial(0);
        }
        this.initParams()
    }

    public updateParam(key: string, value: any) {

        if (!key || key.length <= 0 || typeof value === 'undefined') {
            cc.warn("设置材质参数为空:", key, value)
            return;
        }
        // 防止中途有材质变更.
        if (this.sprite) {
            this._material = this.sprite.getMaterial(0);
        }

        if (this.sprite && this._material) {
            if (this._material.getProperty(key, 0) != undefined) {
                this._material.setProperty(key, JSON.parse(value))
            }
        }
    }
    private initParams() {
        if (this.sprite && this._material && this.params) {

            for (let p of this.params) {

                let key = p.key;
                let value = p.value;

                if (!key || key.length <= 0 || typeof value === 'undefined') {
                    cc.warn("设置材质参数为空:", key, value)
                    return;
                }
                if (this._material.getProperty(key, 0) != undefined) {
                    this._material.setProperty(key, JSON.parse(value))
                }
            }
        }
    }

    protected update(dt) {

        if (this.sprite) {
            this._material = this.sprite.getMaterial(0);
        }
        if (this.node.active && this._material) {
            if (this._material.getProperty("time", 0) != undefined) {
                this._setShaderTime(dt);
            }
        }
    }

    private _setShaderTime(dt) {
        this._material.setProperty('time', this._start);
        this._start += dt;
    }
}