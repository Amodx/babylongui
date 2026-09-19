import { Image } from "@babylonjs/gui/2D/controls/image";
import { GUIElement } from "./GUIElement";
export class GUIImageElement extends GUIElement {
    image;
    get source() {
        return this.image.source;
    }
    set source(value) {
        this.image.source = value;
    }
    constructor() {
        super();
        this.image = new Image();
        const styleProxy = new Proxy(this.style, {
            set: (target, property, value) => {
                target[property] = value;
                this.styleChanged(property, value);
                return true;
            },
        });
        Object.defineProperty(this, "style", {
            get: () => styleProxy,
            set: (value) => Object.assign(styleProxy, value),
        });
    }
    static get observedAttributes() {
        return [
            ...GUIElement.GUIBaseAttributeNames,
            "source",
            "stretch",
            "autoScale",
            "cellId",
            "cellHeight",
            "cellWidth",
            "sourceLeft",
            "sourceTop",
            "sourceWidth",
            "sourceHeight",
            "domImage",
            "sliceBottom",
            "sliceLeft",
            "sliceRight",
            "sliceTop",
            // Transform
            "scaleX",
            "scaleY",
            "transformCenterX",
            "transformCenterY",
            "rotation",
            // Appearance
            "alpha",
            "color",
            "shadowBlur",
            "shadowOffsetX",
            "shadowOffsetY",
            "shadowColor",
            // Behavior
            "isEnabled",
            "isHitTestVisible",
            "zIndex",
            "clipContent",
        ];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            // Layout
            case "width":
                this.image.width = newValue;
                break;
            case "height":
                this.image.height = newValue;
                break;
            case "left":
                this.image.left = newValue;
                break;
            case "top":
                this.image.top = newValue;
                break;
            case "paddingTop":
                this.image.paddingTop = newValue;
                break;
            case "paddingBottom":
                this.image.paddingBottom = newValue;
                break;
            case "paddingLeft":
                this.image.paddingLeft = newValue;
                break;
            case "paddingRight":
                this.image.paddingRight = newValue;
                break;
            case "horizontalAlignment":
                this.image.horizontalAlignment = parseInt(newValue, 10);
                break;
            case "verticalAlignment":
                this.image.verticalAlignment = parseInt(newValue, 10);
                break;
            // Image-specific
            case "source":
                this.image.source = newValue;
                break;
            case "stretch":
                this.image.stretch = parseInt(newValue, 10);
                break;
            case "autoScale":
                this.image.autoScale = newValue === "true";
                break;
            case "cellId":
                this.image.cellId = parseInt(newValue, 10);
                break;
            case "cellHeight":
                this.image.cellHeight = parseInt(newValue, 10);
                break;
            case "cellWidth":
                this.image.cellWidth = parseInt(newValue, 10);
                break;
            case "sourceLeft":
                this.image.sourceLeft = parseInt(newValue, 10);
                break;
            case "sourceTop":
                this.image.sourceTop = parseInt(newValue, 10);
                break;
            case "sourceWidth":
                this.image.sourceWidth = parseInt(newValue, 10);
                break;
            case "sourceHeight":
                this.image.sourceHeight = parseInt(newValue, 10);
                break;
            case "domImage":
                this.image.domImage = document.querySelector(newValue);
                break;
            case "sliceLeft":
                this.image.sliceLeft = parseInt(newValue, 10);
                break;
            case "sliceRight":
                this.image.sliceRight = parseInt(newValue, 10);
                break;
            case "sliceTop":
                this.image.sliceTop = parseInt(newValue, 10);
                break;
            case "sliceBottom":
                this.image.sliceBottom = parseInt(newValue, 10);
                break;
            // Transform
            case "scaleX":
                this.image.scaleX = parseFloat(newValue);
                break;
            case "scaleY":
                this.image.scaleY = parseFloat(newValue);
                break;
            case "transformCenterX":
                this.image.transformCenterX = parseFloat(newValue);
                break;
            case "transformCenterY":
                this.image.transformCenterY = parseFloat(newValue);
                break;
            case "rotation":
                this.image.rotation = parseFloat(newValue);
                break;
            // Appearance
            case "alpha":
                this.image.alpha = parseFloat(newValue);
                break;
            case "color":
                this.image.color = newValue;
                break;
            case "shadowBlur":
                this.image.shadowBlur = parseFloat(newValue);
                break;
            case "shadowOffsetX":
                this.image.shadowOffsetX = parseFloat(newValue);
                break;
            case "shadowOffsetY":
                this.image.shadowOffsetY = parseFloat(newValue);
                break;
            case "shadowColor":
                this.image.shadowColor = newValue;
                break;
            // Behavior
            case "isEnabled":
                this.image.isEnabled = newValue !== "false";
                break;
            case "isHitTestVisible":
                this.image.isHitTestVisible = newValue !== "false";
                break;
            case "zIndex":
                this.image.zIndex = parseInt(newValue, 10);
                break;
            case "clipContent":
                this.image.clipContent = Boolean(parseInt(newValue));
                break;
        }
    }
    styleChanged(property, value) {
        switch (property) {
            case "display":
                this.image.isVisible = value !== "none";
                break;
            case "visibility":
                this.image.isVisible = value !== "hidden";
                break;
            case "left":
                this.image.left = value;
                break;
            case "top":
                this.image.top = value;
                break;
            case "width":
                this.image.width = value;
                break;
            case "height":
                this.image.height = value;
                break;
            case "paddingTop":
                this.image.paddingTop = value;
                break;
            case "paddingBottom":
                this.image.paddingBottom = value;
                break;
            case "paddingLeft":
                this.image.paddingLeft = value;
                break;
            case "paddingRight":
                this.image.paddingRight = value;
                break;
            case "color":
                this.image.color = value;
                break;
            case "opacity":
                this.image.alpha = parseFloat(this.style.opacity);
                break;
            case "clipContent":
                this.image.clipContent = Boolean(parseInt(value));
                break;
        }
    }
    onMounted;
    connectedCallback() {
        this.init();
        GUIImageElement.observedAttributes.forEach((attr) => {
            const value = this.getAttribute(attr);
            if (value !== null) {
                this.attributeChangedCallback(attr, null, value);
            }
        });
        this.processChildren();
        if (this.onMounted)
            this.onMounted(this);
    }
    disconnectedCallback() {
        this.image.dispose();
    }
    processChildren() { }
    getControl() {
        return this.image;
    }
}
customElements.define("gui-image", GUIImageElement);
