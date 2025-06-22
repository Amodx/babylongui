import { Control } from "@babylonjs/gui/2D/controls/control";
import { Animation as BabylonAnimation } from "@babylonjs/core/Animations/animation";
import { EasingFunction, SineEase } from "@babylonjs/core/Animations/easing";
import { Nullable } from "@babylonjs/core/types";
import type { Scene } from "@babylonjs/core";
import { GUICanvasElement } from "./GUICanvas.element";

class AnimationProxy extends Animation {
  constructor(
    public target: any,
    public duration: number,
    public loop: boolean,
    public _animations: BabylonAnimation[],
    public _scene: Scene
  ) {
    super();
  }

  play() {
    this._scene
      .beginDirectAnimation(
        this.target,
        this._animations,
        0,
        this.duration,
        this.loop
      )
      .onAnimationEndObservable.addOnce(() => {
        this.onfinish && this.onfinish({} as any);
      });
    return this;
  }
}

export interface GUIElement {}

export abstract class GUIElement extends HTMLElement {
  static GUIBaseAttributeNames: string[] = [
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
  get width(): string {
    return this.getAttribute("width") || "";
  }

  set width(value: string) {
    this.setAttribute("width", `${parseInt(value)}px`);
  }

  get height(): string {
    return this.getAttribute("height") || "";
  }

  set height(value: string) {
    this.setAttribute("height", `${parseInt(value)}px`);
  }

  get left(): string {
    return this.getAttribute("left") || "";
  }

  set left(value: string) {
    this.setAttribute("left", value);
  }

  get top(): string {
    return this.getAttribute("top") || "";
  }

  set top(value: string) {
    this.setAttribute("top", value);
  }

  get paddingTop(): string {
    return this.getAttribute("paddingTop") || "";
  }

  set paddingTop(value: string) {
    this.setAttribute("paddingTop", value);
  }

  get paddingBottom(): string {
    return this.getAttribute("paddingBottom") || "";
  }

  set paddingBottom(value: string) {
    this.setAttribute("paddingBottom", value);
  }

  get paddingLeft(): string {
    return this.getAttribute("paddingLeft") || "";
  }

  set paddingLeft(value: string) {
    this.setAttribute("paddingLeft", value);
  }

  get paddingRight(): string {
    return this.getAttribute("paddingRight") || "";
  }

  set paddingRight(value: string) {
    this.setAttribute("paddingRight", value);
  }

  get zIndex(): number | undefined {
    const value = this.getAttribute("zIndex");
    return value ? parseInt(value) : undefined;
  }

  set zIndex(value: number | undefined) {
    if (value !== undefined) {
      this.setAttribute("zIndex", value.toString());
    } else {
      this.removeAttribute("zIndex");
    }
  }

  get horizontalAlignment(): number | undefined {
    const value = this.getAttribute("horizontalAlignment");
    return value ? parseInt(value) : undefined;
  }

  set horizontalAlignment(value: number | undefined) {
    if (value !== undefined) {
      this.setAttribute("horizontalAlignment", value.toString());
    } else {
      this.removeAttribute("horizontalAlignment");
    }
  }

  get verticalAlignment(): number | undefined {
    const value = this.getAttribute("vertical-alignment");
    return value ? parseInt(value) : undefined;
  }

  set verticalAlignment(value: number | undefined) {
    if (value !== undefined) {
      this.setAttribute("verticalAlignment", value.toString());
    } else {
      this.removeAttribute("verticalAlignment");
    }
  }

  readonly guiElement: true = true;
  guiCanvas: GUICanvasElement;
  abstract getControl(): Control;

  init() {
    let element: GUICanvasElement | HTMLElement | null = this;
    while (element) {
      if (element instanceof GUICanvasElement) {
        break;
      }
      if ((element as any).guiCanvas) {
        element = (element as any).guiCanvas;
        break;
      }
      element = element.parentElement;
    }

    if (!element || !(element instanceof GUICanvasElement))
      throw new Error(`GUI element must be inside a canvas`);
    this.guiCanvas = element;
  }

  animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions) {
    const control = this.getControl();
    if (!control) {
      throw new Error("Control is not defined.");
    }

    const animations: BabylonAnimation[] = [];
    const properties = Object.keys(keyframes[0]);

    const fps = 30;
    let loop = false;

    const duration =
      typeof options == "number"
        ? options
        : typeof options == "object"
        ? typeof options.duration !== "number"
          ? parseInt(String(options.duration))
          : options.duration
        : 60;

    const totalFrames = fps * (duration / 1000);

    for (const property of properties) {
      const animation = new BabylonAnimation(
        `animaiton-${property}`,
        property,
        fps,
        BabylonAnimation.ANIMATIONTYPE_FLOAT,
        BabylonAnimation.ANIMATIONLOOPMODE_CYCLE
      );
      const values = keyframes.map((_) => _[property]);
      const numberOfKeyframes = values.length;

      animation.setKeys(
        values.map((_, index) => {
          const frame = Math.round(
            (totalFrames / (numberOfKeyframes - 1)) * index
          );
          return {
            frame: frame,
            value: _,
          };
        })
      );
      animations.push(animation);
    }

    return new AnimationProxy(
      control,
      duration,
      loop,
      animations,
      this.guiCanvas.scene
    ).play();
  }
}
