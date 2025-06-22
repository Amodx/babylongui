import { Container } from "@babylonjs/gui/2D/controls/container";
import { GUIElement } from "./GUIElement";
import { Control } from "@babylonjs/gui";
import { GUICanvasElement } from "./GUICanvas.element";

export interface GUIContainerElement {
  background?: string;
  isPointerBlocker?: boolean;
  clipChildren?: boolean;
  clipContent?: boolean;
  useBitmapCache?: boolean;
}

export class GUIContainerElement extends GUIElement {
  container: Container;

  observer: MutationObserver;

  constructor() {
    super();
    this.container = new Container();

    const styleProxy = new Proxy(this.style, {
      set: (target, property, value) => {
        (target as any)[property] = value;
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

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
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

  private styleChanged(property: string | symbol, value: any) {
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



  onMounted: (elm:GUIContainerElement)=>void;

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
            this.processAddChild(node as Element);
          });
          mutation.removedNodes.forEach((node) => {
            if ((node as GUIElement).guiElement) {
              this.container.removeControl((node as GUIElement).getControl());
            }
          });
        }
      });
    });

    this.observer.observe(this, { childList: true });

    if(this.onMounted)this.onMounted(this)
  }

  disconnectedCallback() {
    this.observer.disconnect();
    this.container.dispose();
  }

  private travsereAddChildren(element: Element) {
    Array.from(element.children).forEach((child) => {
      this.processAddChild(child);
    });
  }

  private processAddChild(element: Element) {
    if ((element as GUIElement).guiElement) {
      const control = (element as GUIElement).getControl();
      if (this.container.containsControl(control)) return;
      this.container.addControl(control);
    }
    if (element instanceof DocumentFragment) {
      this.travsereAddChildren(element);
    }
  }

  getControl(): Control {
    return this.container;
  }
}

customElements.define("gui-container", GUIContainerElement);
