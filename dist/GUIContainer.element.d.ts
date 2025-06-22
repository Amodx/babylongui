import { Container } from "@babylonjs/gui/2D/controls/container";
import { GUIElement } from "./GUIElement";
import { Control } from "@babylonjs/gui";
export interface GUIContainerElement {
    background?: string;
    isPointerBlocker?: boolean;
    clipChildren?: boolean;
    clipContent?: boolean;
    useBitmapCache?: boolean;
}
export declare class GUIContainerElement extends GUIElement {
    container: Container;
    observer: MutationObserver;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    private styleChanged;
    onMounted: (elm: GUIContainerElement) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private travsereAddChildren;
    private processAddChild;
    getControl(): Control;
}
