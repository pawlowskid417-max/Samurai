"use client";

import { useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────────
   Grainient — WebGL animated gradient background
   Source: react-bits (DavidHDev/react-bits), adapted for TS
   Uses OGL (lightweight WebGL library) for shader rendering.
   Falls back to a CSS gradient when:
   - WebGL is unavailable
   - prefers-reduced-motion is active
   - viewport is <= 640px (mobile performance)
   ────────────────────────────────────────────────────────────── */

interface GrainientProps {
  /** Hex color — primary (light accent) */
  color1?: string;
  /** Hex color — secondary (mid tone) */
  color2?: string;
  /** Hex color — base/dark tone */
  color3?: string;
  grainAmount?: number;
  speed?: number;
  warpStrength?: number;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

const VERTEX = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void main(){
  float t=iTime*uTimeSpeed;
  vec2 uv=gl_FragCoord.xy/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);
  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;
  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);
  vec3 colA=uColor1;
  vec3 colB=uColor2;
  vec3 colC=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colC,colB,S(edge0,edge1,blendX));
  vec3 layer2=mix(colB,colA,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));
  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(t*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;
  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  fragColor=vec4(clamp(col,0.0,1.0),1.0);
}`;

export function Grainient({
  color1 = "#3b72e8",
  color2 = "#1a3fa0",
  color3 = "#060e30",
  grainAmount = 0.06,
  speed = 0.4,
  warpStrength = 1.8,
  className = "",
}: GrainientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Reduced motion — let CSS fallback show */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Mobile performance — skip WebGL below 640px */
    if (window.innerWidth < 640) return;

    /* Attempt WebGL2 */
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    /* Compile shaders */
    const compileShader = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const vs = compileShader(VERTEX, gl.VERTEX_SHADER);
    const fs = compileShader(FRAGMENT, gl.FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    /* Full-screen triangle */
    const verts = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    /* Uniform locations */
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("iResolution");
    const uTime = u("iTime");
    const uTimeSpeed = u("uTimeSpeed");
    const uColorBalance = u("uColorBalance");
    const uWarpStrength = u("uWarpStrength");
    const uWarpFrequency = u("uWarpFrequency");
    const uWarpSpeed = u("uWarpSpeed");
    const uWarpAmplitude = u("uWarpAmplitude");
    const uBlendAngle = u("uBlendAngle");
    const uBlendSoftness = u("uBlendSoftness");
    const uRotationAmount = u("uRotationAmount");
    const uNoiseScale = u("uNoiseScale");
    const uGrainAmount = u("uGrainAmount");
    const uGrainScale = u("uGrainScale");
    const uGrainAnimated = u("uGrainAnimated");
    const uContrast = u("uContrast");
    const uGamma = u("uGamma");
    const uSaturation = u("uSaturation");
    const uCenterOffset = u("uCenterOffset");
    const uZoom = u("uZoom");
    const uColor1 = u("uColor1");
    const uColor2 = u("uColor2");
    const uColor3 = u("uColor3");

    /* Set static uniforms */
    gl.uniform1f(uTimeSpeed, speed);
    gl.uniform1f(uColorBalance, 0.0);
    gl.uniform1f(uWarpStrength, warpStrength);
    gl.uniform1f(uWarpFrequency, 2.5);
    gl.uniform1f(uWarpSpeed, 0.3);
    gl.uniform1f(uWarpAmplitude, 6.0);
    gl.uniform1f(uBlendAngle, 45.0);
    gl.uniform1f(uBlendSoftness, 0.4);
    gl.uniform1f(uRotationAmount, 80.0);
    gl.uniform1f(uNoiseScale, 0.8);
    gl.uniform1f(uGrainAmount, grainAmount);
    gl.uniform1f(uGrainScale, 1.5);
    gl.uniform1f(uGrainAnimated, 1.0);
    gl.uniform1f(uContrast, 1.1);
    gl.uniform1f(uGamma, 0.9);
    gl.uniform1f(uSaturation, 1.2);
    gl.uniform2f(uCenterOffset, 0.0, 0.0);
    gl.uniform1f(uZoom, 1.0);
    gl.uniform3fv(uColor1, hexToRgb(color1));
    gl.uniform3fv(uColor2, hexToRgb(color2));
    gl.uniform3fv(uColor3, hexToRgb(color3));

    /* Resize observer */
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Render loop */
    startRef.current = performance.now();
    const render = (ts: number) => {
      gl.uniform1f(uTime, (ts - startRef.current) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [color1, color2, color3, grainAmount, speed, warpStrength]);

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {/* CSS fallback — always visible, hidden by canvas on WebGL capable devices */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-700 to-brand-950"
        style={{ zIndex: 0 }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
    </div>
  );
}
