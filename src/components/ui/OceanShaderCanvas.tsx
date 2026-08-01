import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScrollY;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Broad, natural sea-level ocean water caustics wave pattern
  float causticPattern(vec2 uv, float t) {
    vec2 p = uv * 1.5;
    float n1 = snoise(p + vec2(t * 0.10, t * 0.07));
    float n2 = snoise(p * 1.3 - vec2(t * 0.12, t * 0.15));
    float c = sin(p.x * 2.4 + n1 * 1.8) * cos(p.y * 2.4 + n2 * 1.8);
    return pow(abs(c), 1.4);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.y = 1.0 - st.y;

    vec2 aspectSt = st;
    aspectSt.x *= (uResolution.x / uResolution.y);

    vec2 mouseOffset = (uMouse - 0.5) * 0.08;
    float scrollOffset = uScrollY * 0.0003;
    vec2 uv = aspectSt + mouseOffset + vec2(0.0, scrollOffset);

    float t = uTime * 0.35;

    float c1 = causticPattern(uv, t);
    float c2 = causticPattern(uv * 1.4 + vec2(0.3, 0.15), t * 1.15);
    float caustics = clamp(c1 * 0.6 + c2 * 0.4, 0.0, 1.0);

    // Deep vibrant Caribbean ocean blue palette
    vec3 deepOceanBlue = vec3(0.02, 0.14, 0.38);    // Deep ocean blue base
    vec3 electricAzure = vec3(0.0, 0.58, 0.92);     // Vibrant azure cyan waves
    vec3 biolumCyan   = vec3(0.12, 0.85, 0.98);     // Sparkling caustics highlights

    float beam = sin(st.x * 3.1415 + st.y * 1.8 + t * 0.3) * 0.5 + 0.5;
    beam = pow(beam, 2.2) * 0.35;

    float particleNoise = snoise(aspectSt * 10.0 + vec2(0.0, t * 0.3));
    float particles = step(0.93, particleNoise) * 0.28;

    vec3 finalColor = deepOceanBlue;
    finalColor += electricAzure * caustics * 0.65;
    finalColor += biolumCyan * beam * 0.45;
    finalColor += biolumCyan * particles;

    // Solid 1.0 opacity output to prevent WebGL GPU blending flicker
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const OceanShaderCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' });
    if (!gl) return;

    const createShader = (glCtx: WebGLRenderingContext, type: number, source: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.warn(glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uScrollYLoc = gl.getUniformLocation(program, 'uScrollY');

    let animationFrameId: number;
    let startTime = performance.now();
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = e.clientY / window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleResize();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, mouseX, mouseY);
      gl.uniform1f(uScrollYLoc, window.scrollY || 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      id="ocean-shader-bg"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#04131D]"
      style={{ zIndex: -50 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none opacity-100"
        aria-hidden="true"
      />
    </div>
  );
};

export default OceanShaderCanvas;
