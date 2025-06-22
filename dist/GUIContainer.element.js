import { Container } from "@babylonjs/gui/2D/controls/container";
import { GUIElement } from "./GUIElement";
export class GUIContainerElement extends GUIElement {
    container;
    observer;
    constructor() {
        super();
        this.container = new Container();
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
            "background",
            "isPointerBlocker",
            "clipChildren",
            "clipContent",
            "useBitmapCache",
        ];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "width":
                this.container.width = newValue;
                break;
            case "height":
                this.container.height = newValue;
                break;
            case "left":
                this.container.left = newValue;
                break;
            case "top":
                this.container.top = newValue;
                break;
            case "paddingTop":
                this.container.paddingTop = newValue;
                break;
            case "paddingBottom":
                this.container.paddingBottom = newValue;
                break;
            case "paddingLeft":
                this.container.paddingLeft = newValue;
                break;
            case "paddingRight":
                this.container.paddingRight = newValue;
                break;
            case "background":
                this.container.background = newValue;
                break;
            case "isPointerBlocker":
                this.container.isPointerBlocker = newValue === "true";
                break;
            case "clipChildren":
                this.container.clipChildren = newValue === "true";
                break;
            case "clipContent":
                this.container.clipContent = newValue === "true";
                break;
            case "useBitmapCache":
                this.container.useBitmapCache = newValue === "true";
                break;
            case "zIndex":
                this.container.zIndex = parseInt(newValue, 10);
                break;
            case "horizontalAlignment":
                this.container.horizontalAlignment = parseInt(newValue, 10);
                break;
            case "verticalAlignment":
                this.container.verticalAlignment = parseInt(newValue, 10);
                break;
        }
    }
    styleChanged(property, value) {
        switch (property) {
            case "display":
                this.container.isVisible = value == "none" ? false : true;
                break;
            case "visibility":
                this.container.isVisible = value == "hidden" ? false : true;
                break;
            case "left":
                this.container.left = value;
                break;
            case "paddingTop":
                this.container.paddingTop = value;
                break;
            case "paddingBottom":
                this.container.paddingBottom = value;
                break;
            case "paddingLeft":
                this.container.paddingLeft = value;
                break;
            case "paddingRight":
                this.container.paddingRight = value;
                break;
            case "top":
                this.container.top = value;
                break;
            case "width":
                this.container.width = value;
                break;
            case "height":
                this.container.height = value;
                break;
            case "color":
                this.container.color = value;
                break;
            case "opacity":
                this.container.alpha = parseFloat(this.style.opacity);
                break;
        }
    }
    onMounted;
    connectedCallback() {
        this.init();
        GUIContainerElement.observedAttributes.forEach((attr) => {
            const value = this.getAttribute(attr);
            if (value !== null) {
                this.attributeChangedCallback(attr, null, value);
            }
        });
        this.travsereAddChildren(this);
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        this.processAddChild(node);
                    });
                    mutation.removedNodes.forEach((node) => {
                        if (node.guiElement) {
                            this.container.removeControl(node.getControl());
                        }
                    });
                }
            });
        });
        this.observer.observe(this, { childList: true });
        if (this.onMounted)
            this.onMounted(this);
    }
    disconnectedCallback() {
        this.observer.disconnect();
        this.container.dispose();
    }
    travsereAddChildren(element) {
        Array.from(element.children).forEach((child) => {
            this.processAddChild(child);
        });
    }
    processAddChild(element) {
        if (element.guiElement) {
            const control = element.getControl();
            if (this.container.containsControl(control))
                return;
            this.container.addControl(control);
        }
        if (element instanceof DocumentFragment) {
            this.travsereAddChildren(element);
        }
    }
    getControl() {
        return this.container;
    }
}
customElements.define("gui-container", GUIContainerElement);
