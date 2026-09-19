import { Control } from "@babylonjs/gui/2D/controls/control";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
export class GUICanvasElement extends HTMLElement {
    canvas;
    safeArea;
    scene;
    guiCanvas = this;
    _idealWidth = 1920;
    _idealHeight = 1080;
    _resizeObserver = null;
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ["background", "ideal-width", "ideal-height", "show-safe-area"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "background":
                if (this.canvas)
                    this.canvas.background = newValue;
                break;
            case "ideal-width":
                this._idealWidth = Number(newValue);
                this._updateSafeArea();
                break;
            case "ideal-height":
                this._idealHeight = Number(newValue);
                if (this.canvas)
                    this.canvas.idealHeight = this._idealHeight;
                this._updateSafeArea();
                break;
            case "show-safe-area":
                if (this.safeArea) {
                    this.safeArea.thickness =
                        newValue !== null && newValue !== "false" ? 2 : 0;
                    this.safeArea.color = "red";
                }
                break;
        }
    }
    connectedCallback() {
        this._idealWidth = Number(this.getAttribute("ideal-width") ?? 1920);
        this._idealHeight = Number(this.getAttribute("ideal-height") ?? 1080);
        this.canvas = AdvancedDynamicTexture.CreateFullscreenUI("game-ui", true, this.scene);
        this.canvas.idealHeight = this._idealHeight;
        //@ts-ignore
        this.canvas.getContext().imageSmoothingEnabled = false;
        this.safeArea = new Rectangle("safe-area");
        this.safeArea.height = "100%"; // always fills the screen height
        this.safeArea.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.safeArea.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.safeArea.thickness = 0;
        this.safeArea.clipContent = false;
        this.canvas.addControl(this.safeArea);
        this._resizeObserver = this.scene
            .getEngine()
            .onResizeObservable.add(() => this._updateSafeArea());
        this._updateSafeArea();
        GUICanvasElement.observedAttributes.forEach((attr) => {
            const value = this.getAttribute(attr);
            if (value !== null)
                this.attributeChangedCallback(attr, null, value);
        });
        this.processChildren();
    }
    disconnectedCallback() {
        if (this._resizeObserver) {
            this.scene.getEngine().onResizeObservable.remove(this._resizeObserver);
            this._resizeObserver = null;
        }
        this.canvas.dispose();
    }
    _updateSafeArea() {
        if (!this.safeArea || !this.scene)
            return;
        const engine = this.scene.getEngine();
        const screenW = engine.getRenderWidth();
        const screenH = engine.getRenderHeight();
        const safeW = Math.min(screenW * (this._idealHeight / screenH), this._idealWidth);
        this.safeArea.width = `${safeW}px`;
    }
    processChildren() {
        const traverse = (element) => {
            Array.from(element.children).forEach((child) => {
                if (child.guiElement) {
                    this.safeArea.addControl(child.getControl());
                }
                if (child instanceof DocumentFragment)
                    traverse(child);
            });
        };
        traverse(this);
    }
}
customElements.define("gui-canvas", GUICanvasElement);
