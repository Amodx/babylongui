import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock";
import { GUIElement } from "./GUIElement";
import { Control } from "@babylonjs/gui";

export interface GUITextElement {
  text?: string;
  color?: string;
  fontSize?: string | number;
  fontFamily?: string;
  textWrapping?: boolean;
  resizeToFit?: boolean;
  textHorizontalAlignment?: number;
  textVerticalAlignment?: number;
  lineSpacing?: string;
  outlineWidth?: number;
  outlineColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowColor?: string;
}

export class GUITextElement extends GUIElement {
  textBlock: TextBlock;
  private observer: MutationObserver;
  constructor() {
    super();
    this.textBlock = new TextBlock();
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "childList" ||
          mutation.type === "characterData"
        ) {
          this.textBlock.text = this.innerText;
        }
      });
    });

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

  private styleChanged(property: string | symbol, value: any) {
    switch (property) {
      case "display":
        this.textBlock.isVisible = value == "none" ? false : true;
        break;
      case "visibility":
        this.textBlock.isVisible = value == "hidden" ? false : true;
        break;
      case "left":
        this.textBlock.left = value;
        break;
      case "top":
        this.textBlock.top = value;
        break;
      case "color":
        this.textBlock.color = value;
        break;
      case "fontSize":
        this.textBlock.fontSize = value;
        break;
      case "fontFamily":
        this.textBlock.fontFamily = value;
        break;
      case "opacity":
        this.textBlock.alpha = parseFloat(this.style.opacity);
        break;
    }
  }

  static get observedAttributes() {
    return [
      ...GUIElement.GUIBaseAttributeNames,
      "text",
      "color",
      "fontSize",
      "fontFamily",
      "textWrapping",
      "resizeToFit",
      "textHorizontalAlignment",
      "textVerticalAlignment",
      "lineSpacing",
      "outlineWidth",
      "outlineColor",
      "shadowOffsetX",
      "shadowOffsetY",
      "shadowColor",
    ];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "left":
        this.textBlock.left = newValue;
        break;
      case "top":
        this.textBlock.top = newValue;
        break;
      case "text":
        this.textBlock.text = newValue;
        break;
      case "color":
        this.textBlock.color = newValue;
        break;
      case "fontSize":
        this.textBlock.fontSize = newValue;
        break;
      case "fontFamily":
        this.textBlock.fontFamily = newValue;
        break;
      case "textWrapping":
        this.textBlock.textWrapping = newValue === "true";
        break;
      case "resizeToFit":
        this.textBlock.resizeToFit = newValue === "true";
        break;
      case "textHorizontalAlignment":
        this.textBlock.textHorizontalAlignment = parseInt(newValue, 10);
        break;
      case "textVerticalAlignment":
        this.textBlock.textVerticalAlignment = parseInt(newValue, 10);
        break;
      case "lineSpacing":
        this.textBlock.lineSpacing = newValue;
        break;
      case "outlineWidth":
        this.textBlock.outlineWidth = parseInt(newValue, 10);
        break;
      case "outlineColor":
        this.textBlock.outlineColor = newValue;
        break;
      case "shadowOffsetX":
        this.textBlock.shadowOffsetX = parseInt(newValue, 10);
        break;
      case "shadowOffsetY":
        this.textBlock.shadowOffsetY = parseInt(newValue, 10);
        break;
      case "shadowColor":
        this.textBlock.shadowColor = newValue;
        break;
    }
  }

  connectedCallback() {
    this.init();
    GUITextElement.observedAttributes.forEach((attr) => {
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.attributeChangedCallback(attr, null, value);
      }
    });
    this.processChildren();

    this.observer.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  disconnectedCallback() {
    this.textBlock.dispose();
    this.observer.disconnect();
  }

  processChildren() {
    this.textBlock.text += this.innerText;
  }

  getControl(): Control {
    return this.textBlock;
  }
}

customElements.define("gui-text", GUITextElement);
