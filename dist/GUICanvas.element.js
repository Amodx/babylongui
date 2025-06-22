import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
export class GUICanvasElement extends HTMLElement {
    canvas;
    scene;
    guiCanvas = this;
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ["background"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "background":
                this.canvas.background = newValue;
                break;
        }
    }
    connectedCallback() {
        this.canvas = AdvancedDynamicTexture.CreateFullscreenUI("game-ui", true, this.scene);
        this.canvas.idealHeight = 640 * 4;
        this.canvas.idealWidth = 480 * 4;
        //@ts-ignore
        this.canvas.getContext().imageSmoothingEnabled = false;
        GUICanvasElement.observedAttributes.forEach((attr) => {
            const value = this.getAttribute(attr);
            if (value !== null) {
                this.attributeChangedCallback(attr, null, value);
            }
        });
        this.processChildren();
    }
    disconnectedCallback() {
        this.canvas.dispose();
    }
    processChildren() {
        const traverse = (element) => {
            Array.from(element.children).forEach((child) => {
                if (child.guiElement) {
                    this.canvas.addControl(child.getControl());
                }
                if (child instanceof DocumentFragment) {
                    traverse(child);
                }
            });
        };
        traverse(this);
    }
}
customElements.define("gui-canvas", GUICanvasElement);
