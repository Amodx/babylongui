import { Animation as BabylonAnimation } from "@babylonjs/core/Animations/animation";
import { GUICanvasElement } from "./GUICanvas.element";
class AnimationProxy extends Animation {
    target;
    duration;
    loop;
    _animations;
    _scene;
    constructor(target, duration, loop, _animations, _scene) {
        super();
        this.target = target;
        this.duration = duration;
        this.loop = loop;
        this._animations = _animations;
        this._scene = _scene;
    }
    play() {
        this._scene
            .beginDirectAnimation(this.target, this._animations, 0, this.duration, this.loop)
            .onAnimationEndObservable.addOnce(() => {
            this.onfinish && this.onfinish({});
        });
        return this;
    }
}
export class GUIElement extends HTMLElement {
    static GUIBaseAttributeNames = [
        "width",
        "height",
        "left",
        "top",
        "paddingTop",
        "paddingBottom",
        "paddingLeft",
        "paddingRight",
        "zIndex",
        "horizontalAlignment",
        "verticalAlignment",
    ];
    get width() {
        return this.getAttribute("width") || "";
    }
    set width(value) {
        this.setAttribute("width", `${parseInt(value)}px`);
    }
    get height() {
        return this.getAttribute("height") || "";
    }
    set height(value) {
        this.setAttribute("height", `${parseInt(value)}px`);
    }
    get left() {
        return this.getAttribute("left") || "";
    }
    set left(value) {
        this.setAttribute("left", value);
    }
    get top() {
        return this.getAttribute("top") || "";
    }
    set top(value) {
        this.setAttribute("top", value);
    }
    get paddingTop() {
        return this.getAttribute("paddingTop") || "";
    }
    set paddingTop(value) {
        this.setAttribute("paddingTop", value);
    }
    get paddingBottom() {
        return this.getAttribute("paddingBottom") || "";
    }
    set paddingBottom(value) {
        this.setAttribute("paddingBottom", value);
    }
    get paddingLeft() {
        return this.getAttribute("paddingLeft") || "";
    }
    set paddingLeft(value) {
        this.setAttribute("paddingLeft", value);
    }
    get paddingRight() {
        return this.getAttribute("paddingRight") || "";
    }
    set paddingRight(value) {
        this.setAttribute("paddingRight", value);
    }
    get zIndex() {
        const value = this.getAttribute("zIndex");
        return value ? parseInt(value) : undefined;
    }
    set zIndex(value) {
        if (value !== undefined) {
            this.setAttribute("zIndex", value.toString());
        }
        else {
            this.removeAttribute("zIndex");
        }
    }
    get horizontalAlignment() {
        const value = this.getAttribute("horizontalAlignment");
        return value ? parseInt(value) : undefined;
    }
    set horizontalAlignment(value) {
        if (value !== undefined) {
            this.setAttribute("horizontalAlignment", value.toString());
        }
        else {
            this.removeAttribute("horizontalAlignment");
        }
    }
    get verticalAlignment() {
        const value = this.getAttribute("vertical-alignment");
        return value ? parseInt(value) : undefined;
    }
    set verticalAlignment(value) {
        if (value !== undefined) {
            this.setAttribute("verticalAlignment", value.toString());
        }
        else {
            this.removeAttribute("verticalAlignment");
        }
    }
    guiElement = true;
    guiCanvas;
    init() {
        let element = this;
        while (element) {
            if (element instanceof GUICanvasElement) {
                break;
            }
            if (element.guiCanvas) {
                element = element.guiCanvas;
                break;
            }
            element = element.parentElement;
        }
        if (!element || !(element instanceof GUICanvasElement))
            throw new Error(`GUI element must be inside a canvas`);
        this.guiCanvas = element;
    }
    animate(keyframes, options) {
        const control = this.getControl();
        if (!control) {
            throw new Error("Control is not defined.");
        }
        const animations = [];
        const properties = Object.keys(keyframes[0]);
        const fps = 30;
        let loop = false;
        const duration = typeof options == "number"
            ? options
            : typeof options == "object"
                ? typeof options.duration !== "number"
                    ? parseInt(String(options.duration))
                    : options.duration
                : 60;
        const totalFrames = fps * (duration / 1000);
        for (const property of properties) {
            const animation = new BabylonAnimation(`animaiton-${property}`, property, fps, BabylonAnimation.ANIMATIONTYPE_FLOAT, BabylonAnimation.ANIMATIONLOOPMODE_CYCLE);
            const values = keyframes.map((_) => _[property]);
            const numberOfKeyframes = values.length;
            animation.setKeys(values.map((_, index) => {
                const frame = Math.round((totalFrames / (numberOfKeyframes - 1)) * index);
                return {
                    frame: frame,
                    value: _,
                };
            }));
            animations.push(animation);
        }
        return new AnimationProxy(control, duration, loop, animations, this.guiCanvas.scene).play();
    }
}
