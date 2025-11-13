

// import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react'; // 1. IMPORT HOOKS
// import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

// // --- OGL Helper Functions ---

// function debounce(func, wait) {
//   let timeout;
//   return function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// function lerp(p1, p2, t) {
//   return p1 + (p2 - p1) * t;
// }

// function drawRoundedRect(ctx, x, y, width, height, radius) {
//   if (width < 2 * radius) radius = width / 2;
//   if (height < 2 * radius) radius = height / 2;
//   ctx.beginPath();
//   ctx.moveTo(x + radius, y);
//   ctx.arcTo(x + width, y, x + width, y + height, radius);
//   ctx.arcTo(x + width, y + height, x, y + height, radius);
//   ctx.arcTo(x, y + height, x, y, radius);
//   ctx.arcTo(x, y, x + width, y, radius);
//   ctx.closePath();
// }

// function wrapText(context, text, x, y, maxWidth, lineHeight) {
//   let line = '';
//   let testLine, metrics, testWidth;
  
//   const truncatedText = text.length > 150 ? text.substring(0, 150) + '...' : text;
//   const truncatedWords = truncatedText.split(' ');

//   for (let n = 0; n < truncatedWords.length; n++) {
//     testLine = line + truncatedWords[n] + ' ';
//     metrics = context.measureText(testLine);
//     testWidth = metrics.width;
//     if (testWidth > maxWidth && n > 0) {
//       context.fillText(line, x, y);
//       line = truncatedWords[n] + ' ';
//       y += lineHeight;
//     } else {
//       line = testLine;
//     }
//   }
//   context.fillText(line, x, y);
// }


// class Media {
//   constructor({
//     geometry,
//     gl,
//     image,
//     index,
//     length,
//     renderer,
//     scene,
//     screen,
//     viewport,
//     bend,
//     borderRadius = 0,
//     customerName,
//     customerDesignation,
//     testimonialText
//   }) {
//     this.extra = 0;
//     this.geometry = geometry;
//     this.gl = gl;
//     this.image = image; // This is the avatar_url
//     this.index = index;
//     this.length = length;
//     this.renderer = renderer;
//     this.scene = scene;
//     this.screen = screen;
//     this.viewport = viewport;
//     this.bend = bend;
//     this.borderRadius = borderRadius;
//     this.customerName = customerName;
//     this.customerDesignation = customerDesignation;
//     this.testimonialText = testimonialText;

//     this.createShader();
//     this.createMesh();
//     this.onResize();
//   }

//   createShader() {
//     const texture = new Texture(this.gl, {
//       generateMipmaps: true
//     });

//     this.program = new Program(this.gl, {
//       depthTest: false,
//       depthWrite: false,
//       vertex: `
//         precision highp float;
//         attribute vec3 position;
//         attribute vec2 uv;
//         uniform mat4 modelViewMatrix;
//         uniform mat4 projectionMatrix;
//         uniform float uTime;
//         uniform float uSpeed;
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           vec3 p = position;
//           p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
//         }
//       `,
//       fragment: `
//         precision highp float;
//         uniform vec2 uImageSizes;
//         uniform vec2 uPlaneSizes;
//         uniform sampler2D tMap;
//         uniform float uBorderRadius;
//         varying vec2 vUv;
        
//         float roundedBoxSDF(vec2 p, vec2 b, float r) {
//           vec2 d = abs(p) - b;
//           return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
//         }
        
//         void main() {
//           vec2 ratio = vec2(
//             min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
//             min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
//           );
//           vec2 uv = vec2(
//             vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
//             vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
//           );
//           vec4 color = texture2D(tMap, uv);
          
//           float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
//           // Smooth antialiasing for edges
//           float edgeSmooth = 0.002;
//           float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
//           gl_FragColor = vec4(color.rgb, alpha * color.a);
//         }
//       `,
//       uniforms: {
//         tMap: { value: texture },
//         uPlaneSizes: { value: [0, 0] },
//         uImageSizes: { value: [0, 0] },
//         uSpeed: { value: 0 },
//         uTime: { value: 100 * Math.random() },
//         uBorderRadius: { value: this.borderRadius }
//       },
//       transparent: true
//     });

//     // --- NEW CARD BAKING LOGIC ---
//     const avatarImg = new Image();
//     avatarImg.crossOrigin = 'anonymous';
//     avatarImg.src = this.image; // this.image is the avatar_url or picsum fallback

//     const drawCard = (img) => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');

//       // Card dimensions
//       const cardWidth = 512;
//       const cardHeight = 384; // 4:3 aspect ratio
//       const padding = 30;
//       canvas.width = cardWidth;
//       canvas.height = cardHeight;

//       // 1. Draw rounded background
//       ctx.fillStyle = '#1A202C'; // Tailwind 'gray-900'
//       drawRoundedRect(ctx, 0, 0, cardWidth, cardHeight, 20);
//       ctx.fill();

//       // 2. Draw Avatar (if img loaded)
//       const avatarSize = 80;
//       if (img) {
//         ctx.save();
//         ctx.beginPath();
//         ctx.arc(padding + avatarSize / 2, padding + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
//         ctx.clip();
//         ctx.drawImage(img, padding, padding, avatarSize, avatarSize);
//         ctx.restore();
//       }

//       // 3. Draw Name
//       ctx.fillStyle = '#FFFFFF';
//       ctx.font = 'bold 22px sans-serif';
//       const nameX = padding + avatarSize + 20;
//       const nameY = padding + 35;
//       ctx.fillText(this.customerName || 'Anonymous', nameX, nameY);

//       // 4. Draw Designation
//       ctx.fillStyle = '#A0AEC0'; // Tailwind 'gray-400'
//       ctx.font = '18px sans-serif';
//       const desigY = padding + 60;
//       ctx.fillText(this.customerDesignation || 'Customer', nameX, desigY);

//       // 5. Draw Testimonial Text
//       ctx.fillStyle = '#E2E8F0'; // Tailwind 'gray-200'
//       ctx.font = '20px italic sans-serif';
//       const textY = padding + avatarSize + 40;
//       const textX = padding;
//       const maxWidth = cardWidth - (padding * 2);
//       const lineHeight = 28;
      
//       const fullTestimonial = `"${this.testimonialText || 'No feedback provided.'}"`;
//       wrapText(ctx, fullTestimonial, textX, textY, maxWidth, lineHeight);

//       // 6. Update the OGL texture
//       texture.image = canvas;
//       this.program.uniforms.uImageSizes.value = [canvas.width, canvas.height];
//     };

//     avatarImg.onload = () => {
//       drawCard(avatarImg);
//     };

//     avatarImg.onerror = () => {
//       console.warn('Failed to load avatar, drawing fallback card.');
//       drawCard(null); // Draw card without avatar
//     };
//   }

//   createMesh() {
//     this.plane = new Mesh(this.gl, {
//       geometry: this.geometry,
//       program: this.program
//     });
//     this.plane.setParent(this.scene);
//   }

//   update(scroll, direction) {
//     this.plane.position.x = this.x - scroll.current - this.extra;

//     const x = this.plane.position.x;
//     const H = this.viewport.width / 2;

//     if (this.bend === 0) {
//       this.plane.position.y = 0;
//       this.plane.rotation.z = 0;
//     } else {
//       const B_abs = Math.abs(this.bend);
//       const R = (H * H + B_abs * B_abs) / (2 * B_abs);
//       const effectiveX = Math.min(Math.abs(x), H);

//       const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
//       if (this.bend > 0) {
//         this.plane.position.y = -arc;
//         this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
//       } else {
//         this.plane.position.y = arc;
//         this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
//       }
//     }

//     this.speed = scroll.current - scroll.last;
//     this.program.uniforms.uTime.value += 0.04;
//     this.program.uniforms.uSpeed.value = this.speed;

//     const planeOffset = this.plane.scale.x / 2;
//     const viewportOffset = this.viewport.width / 2;
//     this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
//     this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
//     if (direction === 'right' && this.isBefore) {
//       this.extra -= this.widthTotal;
//       this.isBefore = this.isAfter = false;
//     }
//     if (direction === 'left' && this.isAfter) {
//       this.extra += this.widthTotal;
//       this.isBefore = this.isAfter = false;
//     }
//   }

//   onResize({ screen, viewport } = {}) {
//     if (screen) this.screen = screen;
//     if (viewport) {
//       this.viewport = viewport;
//       if (this.plane.program.uniforms.uViewportSizes) {
//         this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
//       }
//     }
//     this.scale = this.screen.height / 1500;
    
//     // Adjust scaling to be more card-like (e.g., 4:3 ratio)
//     const planeHeight = (this.viewport.height * (900 * this.scale)) / this.screen.height;
//     const planeWidth = planeHeight * (4 / 3); // Enforce 4:3 aspect ratio

//     this.plane.scale.y = planeHeight;
//     this.plane.scale.x = planeWidth;
    
//     this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
//     this.padding = 2;
//     this.width = this.plane.scale.x + this.padding;
//     this.widthTotal = this.width * this.length;
//     this.x = this.width * this.index;
//   }
// }

// class App {
//   constructor(
//     container,
//     {
//       items,
//       bend,
//       borderRadius = 0,
//       scrollSpeed = 2,
//       scrollEase = 0.05
//     } = {}
//   ) {
//     document.documentElement.classList.remove('no-js');
//     this.container = container;
//     this.scrollSpeed = scrollSpeed;
//     this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
//     this.onCheckDebounce = debounce(this.onCheck, 200);

//     autoBind(this); // 2. BIND 'this' for new methods

//     this.createRenderer();
//     this.createCamera();
//     this.createScene();
//     this.onResize();
//     this.createGeometry();
//     this.createMedias(items, bend, borderRadius);
//     this.update();
//     this.addEventListeners();
//   }

//   createRenderer() {
//     this.renderer = new Renderer({
//       alpha: true,
//       antialias: true,
//       dpr: Math.min(window.devicePixelRatio || 1, 2)
//     });
//     this.gl = this.renderer.gl;
//     this.gl.clearColor(0, 0, 0, 0);
//     this.container.appendChild(this.gl.canvas);
//   }

//   createCamera() {
//     this.camera = new Camera(this.gl);
//     this.camera.fov = 45;
//     this.camera.position.z = 20;
//   }

//   createScene() {
//     this.scene = new Transform();
//   }

//   createGeometry() {
//     this.planeGeometry = new Plane(this.gl, {
//       heightSegments: 50,
//       widthSegments: 100
//     });
//   }

//   createMedias(items, bend = 1, borderRadius) {
//     this.mediasImages = items.concat(items); // Duplicate for seamless loop
//     this.medias = this.mediasImages.map((data, index) => {
//       return new Media({
//         geometry: this.planeGeometry,
//         gl: this.gl,
//         image: data.image, // Pass the avatar/picsum URL
//         index,
//         length: this.mediasImages.length,
//         renderer: this.renderer,
//         scene: this.scene,
//         screen: this.screen,
//         viewport: this.viewport,
//         bend,
//         borderRadius,
//         customerName: data.customer_name,
//         customerDesignation: data.customer_designation,
//         testimonialText: data.testimonial_text
//       });
//     });
//   }

//   // 3. ADD NEW METHODS to the App class
//   move(direction) {
//     if (!this.medias || !this.medias[0]) return;
//     const width = this.medias[0].width; // Get the width of one item
    
//     // Update the scroll target
//     // direction will be -1 for left (decrease target)
//     // direction will be 1 for right (increase target)
//     this.scroll.target += direction * width;
    
//     // Snap to the nearest item
//     this.onCheck();
//   }

//   onTouchDown(e) {
//     this.isDown = true;
//     this.scroll.position = this.scroll.current;
//     this.start = e.touches ? e.touches[0].clientX : e.clientX;
//   }

//   onTouchMove(e) {
//     if (!this.isDown) return;
//     const x = e.touches ? e.touches[0].clientX : e.clientX;
//     const distance = (this.start - x) * (this.scrollSpeed * 0.025);
//     this.scroll.target = this.scroll.position + distance;
//   }

//   onTouchUp() {
//     this.isDown = false;
//     this.onCheck();
//   }

//   onWheel(e) {
//     const delta = e.deltaY || e.wheelDelta || e.detail;
//     this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
//     this.onCheckDebounce();
//   }

//   onCheck() {
//     if (!this.medias || !this.medias[0]) return;
//     const width = this.medias[0].width;
//     const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
//     const item = width * itemIndex;
//     this.scroll.target = this.scroll.target < 0 ? -item : item;
//   }

//   onResize() {
//     this.screen = {
//       width: this.container.clientWidth,
//       height: this.container.clientHeight
//     };
//     this.renderer.setSize(this.screen.width, this.screen.height);
//     this.camera.perspective({
//       aspect: this.screen.width / this.screen.height
//     });
//     const fov = (this.camera.fov * Math.PI) / 180;
//     const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
//     const width = height * this.camera.aspect;
//     this.viewport = { width, height };
//     if (this.medias) {
//       this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
//     }
//   }

//   update() {
//     this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
//     const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
//     if (this.medias) {
//       this.medias.forEach(media => media.update(this.scroll, direction));
//     }
//     this.renderer.render({ scene: this.scene, camera: this.camera });
//     this.scroll.last = this.scroll.current;
//     this.raf = window.requestAnimationFrame(this.update);
//   }

//   addEventListeners() {
//     window.addEventListener('resize', this.onResize);
//     window.addEventListener('mousewheel', this.onWheel);
//     window.addEventListener('wheel', this.onWheel);
//     window.addEventListener('mousedown', this.onTouchDown);
//     window.addEventListener('mousemove', this.onTouchMove);
//     window.addEventListener('mouseup', this.onTouchUp);
//     window.addEventListener('touchstart', this.onTouchDown);
//     window.addEventListener('touchmove', this.onTouchMove);
//     window.addEventListener('touchend', this.onTouchUp);
//   }

//   destroy() {
//     window.cancelAnimationFrame(this.raf);
//     window.removeEventListener('resize', this.onResize);
//     window.removeEventListener('mousewheel', this.onWheel);
//     window.removeEventListener('wheel', this.onWheel);
//     window.removeEventListener('mousedown', this.onTouchDown);
//     window.removeEventListener('mousemove', this.onTouchMove);
//     window.removeEventListener('mouseup', this.onTouchUp);
//     window.removeEventListener('touchstart', this.onTouchDown);
//     window.removeEventListener('touchmove', this.onTouchMove);
//     window.removeEventListener('touchend', this.onTouchUp);
//     if (this.renderer && this.renderer.gl && this.renderer.gl.canvas && this.renderer.gl.canvas.parentNode) {
//       this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
//     }
//   }
// }

// // Need to re-add autoBind as it's used by App
// function autoBind(instance) {
//   const proto = Object.getPrototypeOf(instance);
//   Object.getOwnPropertyNames(proto).forEach(key => {
//     if (key !== 'constructor' && typeof instance[key] === 'function') {
//       instance[key] = instance[key].bind(instance);
//     }
//   });
// }


// // --- React Component Wrapper ---

// // 4. Wrap the component with forwardRef
// const CircularGallery = forwardRef(({
//   items,
//   bend = 1,
//   borderRadius = 0.05,
//   scrollSpeed = 2,
//   scrollEase = 0.05
// }, ref) => { // 5. Accept 'ref' as the second argument
//   const containerRef = useRef(null);
//   const [app, setApp] = useState(null); // 6. Store app instance in state

//   useEffect(() => {
//     if (!containerRef.current || !items || items.length === 0) return;

//     // 7. Create and set the app instance
//     const newApp = new App(containerRef.current, { items, bend, borderRadius, scrollSpeed, scrollEase });
//     setApp(newApp);

//     return () => {
//       newApp.destroy();
//     };
//   }, [items, bend, borderRadius, scrollSpeed, scrollEase]);

//   // 8. Expose move methods using useImperativeHandle
//   useImperativeHandle(ref, () => ({
//     moveLeft: () => {
//       if (app) app.move(-1); // Move left (decrease target)
//     },
//     moveRight: () => {
//       if (app) app.move(1); // Move right (increase target)
//     }
//   }));

//   return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;
// });

// export default CircularGallery;

// import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
// import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

// // --- OGL Helper Functions ---

// function debounce(func, wait) {
//   let timeout;
//   return function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// function lerp(p1, p2, t) {
//   return p1 + (p2 - p1) * t;
// }

// function drawRoundedRect(ctx, x, y, width, height, radius) {
//   if (width < 2 * radius) radius = width / 2;
//   if (height < 2 * radius) radius = height / 2;
//   ctx.beginPath();
//   ctx.moveTo(x + radius, y);
//   ctx.arcTo(x + width, y, x + width, y + height, radius);
//   ctx.arcTo(x + width, y + height, x, y + height, radius);
//   ctx.arcTo(x, y + height, x, y, radius);
//   ctx.arcTo(x, y, x + width, y, radius);
//   ctx.closePath();
// }

// // Helper to draw a single star
// function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
//   let rot = Math.PI / 2 * 3;
//   let x = cx;
//   let y = cy;
//   let step = Math.PI / spikes;

//   ctx.beginPath();
//   ctx.moveTo(cx, cy - outerRadius);
//   for (let i = 0; i < spikes; i++) {
//     x = cx + Math.cos(rot) * outerRadius;
//     y = cy + Math.sin(rot) * outerRadius;
//     ctx.lineTo(x, y);
//     rot += step;

//     x = cx + Math.cos(rot) * innerRadius;
//     y = cy + Math.sin(rot) * innerRadius;
//     ctx.lineTo(x, y);
//     rot += step;
//   }
//   ctx.lineTo(cx, cy - outerRadius);
//   ctx.closePath();
//   ctx.fillStyle = color;
//   ctx.fill();
// }

// function wrapText(context, text, x, y, maxWidth, lineHeight) {
//   let line = '';
//   let testLine, metrics, testWidth;
  
//   const truncatedText = text.length > 150 ? text.substring(0, 150) + '...' : text;
//   const truncatedWords = truncatedText.split(' ');

//   for (let n = 0; n < truncatedWords.length; n++) {
//     testLine = line + truncatedWords[n] + ' ';
//     metrics = context.measureText(testLine);
//     testWidth = metrics.width;
//     if (testWidth > maxWidth && n > 0) {
//       context.fillText(line, x, y);
//       line = truncatedWords[n] + ' ';
//       y += lineHeight;
//     } else {
//       line = testLine;
//     }
//   }
//   context.fillText(line, x, y);
// }

// class Media {
//   constructor({
//     geometry,
//     gl,
//     image,
//     index,
//     length,
//     renderer,
//     scene,
//     screen,
//     viewport,
//     bend,
//     borderRadius = 0,
//     customerName,
//     customerDesignation,
//     testimonialText,
//     rating // Receive rating here
//   }) {
//     this.extra = 0;
//     this.geometry = geometry;
//     this.gl = gl;
//     this.image = image; 
//     this.index = index;
//     this.length = length;
//     this.renderer = renderer;
//     this.scene = scene;
//     this.screen = screen;
//     this.viewport = viewport;
//     this.bend = bend;
//     this.borderRadius = borderRadius;
//     this.customerName = customerName;
//     this.customerDesignation = customerDesignation;
//     this.testimonialText = testimonialText;
//     this.rating = rating || 5; // Default to 5 if undefined

//     this.createShader();
//     this.createMesh();
//     this.onResize();
//   }

//   createShader() {
//     const texture = new Texture(this.gl, {
//       generateMipmaps: true
//     });

//     this.program = new Program(this.gl, {
//       depthTest: false,
//       depthWrite: false,
//       vertex: `
//         precision highp float;
//         attribute vec3 position;
//         attribute vec2 uv;
//         uniform mat4 modelViewMatrix;
//         uniform mat4 projectionMatrix;
//         uniform float uTime;
//         uniform float uSpeed;
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           vec3 p = position;
//           p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
//         }
//       `,
//       fragment: `
//         precision highp float;
//         uniform vec2 uImageSizes;
//         uniform vec2 uPlaneSizes;
//         uniform sampler2D tMap;
//         uniform float uBorderRadius;
//         varying vec2 vUv;
        
//         float roundedBoxSDF(vec2 p, vec2 b, float r) {
//           vec2 d = abs(p) - b;
//           return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
//         }
        
//         void main() {
//           vec2 ratio = vec2(
//             min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
//             min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
//           );
//           vec2 uv = vec2(
//             vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
//             vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
//           );
//           vec4 color = texture2D(tMap, uv);
          
//           float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
//           float edgeSmooth = 0.002;
//           float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
//           gl_FragColor = vec4(color.rgb, alpha * color.a);
//         }
//       `,
//       uniforms: {
//         tMap: { value: texture },
//         uPlaneSizes: { value: [0, 0] },
//         uImageSizes: { value: [0, 0] },
//         uSpeed: { value: 0 },
//         uTime: { value: 100 * Math.random() },
//         uBorderRadius: { value: this.borderRadius }
//       },
//       transparent: true
//     });

//     // --- CARD BAKING LOGIC ---
//     const avatarImg = new Image();
//     avatarImg.crossOrigin = 'anonymous';
//     avatarImg.src = this.image;

//     const drawCard = (img) => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');

//       // Card dimensions
//       const cardWidth = 512;
//       const cardHeight = 384; 
//       const padding = 30;
//       canvas.width = cardWidth;
//       canvas.height = cardHeight;

//       // 1. Draw rounded background
//       ctx.fillStyle = '#1A202C'; // Tailwind 'gray-900'
//       drawRoundedRect(ctx, 0, 0, cardWidth, cardHeight, 20);
//       ctx.fill();

//       // 2. Draw Avatar
//       const avatarSize = 80;
//       if (img) {
//         ctx.save();
//         ctx.beginPath();
//         ctx.arc(padding + avatarSize / 2, padding + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
//         ctx.clip();
//         ctx.drawImage(img, padding, padding, avatarSize, avatarSize);
//         ctx.restore();
//       }

//       // 3. Draw Name
//       ctx.fillStyle = '#FFFFFF';
//       ctx.font = 'bold 22px sans-serif';
//       const nameX = padding + avatarSize + 20;
//       const nameY = padding + 35;
//       ctx.fillText(this.customerName || 'Anonymous', nameX, nameY);

//       // 4. Draw Designation
//       ctx.fillStyle = '#A0AEC0'; // Tailwind 'gray-400'
//       ctx.font = '18px sans-serif';
//       const desigY = padding + 60;
//       ctx.fillText(this.customerDesignation || 'Customer', nameX, desigY);

//       // 5. Draw Stars (NEW)
//       const starSize = 12;
//       const starSpacing = 28; // Distance between stars
//       const starY = padding + 85; // Position below designation
//       const starXStart = nameX; // Align with name/designation

//       for (let i = 0; i < 5; i++) {
//         const color = i < this.rating ? '#FBBF24' : '#4A5568'; // Yellow-400 or Gray-700
//         drawStar(ctx, starXStart + (i * starSpacing), starY, 5, 10, 5, color);
//       }

//       // 6. Draw Testimonial Text
//       ctx.fillStyle = '#E2E8F0'; // Tailwind 'gray-200'
//       ctx.font = '20px italic sans-serif';
//       // Pushed text down to account for stars
//       const textY = padding + avatarSize + 50; 
//       const textX = padding;
//       const maxWidth = cardWidth - (padding * 2);
//       const lineHeight = 28;
      
//       const fullTestimonial = `"${this.testimonialText || 'No feedback provided.'}"`;
//       wrapText(ctx, fullTestimonial, textX, textY, maxWidth, lineHeight);

//       // 7. Update the OGL texture
//       texture.image = canvas;
//       this.program.uniforms.uImageSizes.value = [canvas.width, canvas.height];
//     };

//     avatarImg.onload = () => drawCard(avatarImg);
//     avatarImg.onerror = () => {
//       console.warn('Failed to load avatar, drawing fallback.');
//       drawCard(null);
//     };
//   }

//   createMesh() {
//     this.plane = new Mesh(this.gl, {
//       geometry: this.geometry,
//       program: this.program
//     });
//     this.plane.setParent(this.scene);
//   }

//   update(scroll, direction) {
//     this.plane.position.x = this.x - scroll.current - this.extra;

//     const x = this.plane.position.x;
//     const H = this.viewport.width / 2;

//     if (this.bend === 0) {
//       this.plane.position.y = 0;
//       this.plane.rotation.z = 0;
//     } else {
//       const B_abs = Math.abs(this.bend);
//       const R = (H * H + B_abs * B_abs) / (2 * B_abs);
//       const effectiveX = Math.min(Math.abs(x), H);

//       const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
//       if (this.bend > 0) {
//         this.plane.position.y = -arc;
//         this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
//       } else {
//         this.plane.position.y = arc;
//         this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
//       }
//     }

//     this.speed = scroll.current - scroll.last;
//     this.program.uniforms.uTime.value += 0.04;
//     this.program.uniforms.uSpeed.value = this.speed;

//     const planeOffset = this.plane.scale.x / 2;
//     const viewportOffset = this.viewport.width / 2;
//     this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
//     this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
//     if (direction === 'right' && this.isBefore) {
//       this.extra -= this.widthTotal;
//       this.isBefore = this.isAfter = false;
//     }
//     if (direction === 'left' && this.isAfter) {
//       this.extra += this.widthTotal;
//       this.isBefore = this.isAfter = false;
//     }
//   }

//   onResize({ screen, viewport } = {}) {
//     if (screen) this.screen = screen;
//     if (viewport) {
//       this.viewport = viewport;
//       if (this.plane.program.uniforms.uViewportSizes) {
//         this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
//       }
//     }
//     this.scale = this.screen.height / 1500;
    
//     const planeHeight = (this.viewport.height * (900 * this.scale)) / this.screen.height;
//     const planeWidth = planeHeight * (4 / 3);

//     this.plane.scale.y = planeHeight;
//     this.plane.scale.x = planeWidth;
    
//     this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
//     this.padding = 2;
//     this.width = this.plane.scale.x + this.padding;
//     this.widthTotal = this.width * this.length;
//     this.x = this.width * this.index;
//   }
// }

// class App {
//   constructor(
//     container,
//     {
//       items,
//       bend,
//       borderRadius = 0,
//       scrollSpeed = 2,
//       scrollEase = 0.05
//     } = {}
//   ) {
//     document.documentElement.classList.remove('no-js');
//     this.container = container;
//     this.scrollSpeed = scrollSpeed;
//     this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
//     this.onCheckDebounce = debounce(this.onCheck, 200);

//     autoBind(this);

//     this.createRenderer();
//     this.createCamera();
//     this.createScene();
//     this.onResize();
//     this.createGeometry();
//     this.createMedias(items, bend, borderRadius);
//     this.update();
//     this.addEventListeners();
//   }

//   createRenderer() {
//     this.renderer = new Renderer({
//       alpha: true,
//       antialias: true,
//       dpr: Math.min(window.devicePixelRatio || 1, 2)
//     });
//     this.gl = this.renderer.gl;
//     this.gl.clearColor(0, 0, 0, 0);
//     this.container.appendChild(this.gl.canvas);
//   }

//   createCamera() {
//     this.camera = new Camera(this.gl);
//     this.camera.fov = 45;
//     this.camera.position.z = 20;
//   }

//   createScene() {
//     this.scene = new Transform();
//   }

//   createGeometry() {
//     this.planeGeometry = new Plane(this.gl, {
//       heightSegments: 50,
//       widthSegments: 100
//     });
//   }

//   createMedias(items, bend = 1, borderRadius) {
//     this.mediasImages = items.concat(items);
//     this.medias = this.mediasImages.map((data, index) => {
//       return new Media({
//         geometry: this.planeGeometry,
//         gl: this.gl,
//         image: data.image,
//         index,
//         length: this.mediasImages.length,
//         renderer: this.renderer,
//         scene: this.scene,
//         screen: this.screen,
//         viewport: this.viewport,
//         bend,
//         borderRadius,
//         customerName: data.customer_name,
//         customerDesignation: data.customer_designation,
//         testimonialText: data.testimonial_text,
//         rating: data.rating // Pass rating
//       });
//     });
//   }

//   // --- CONTROLS ---
//   move(direction) {
//     if (!this.medias || !this.medias[0]) return;
//     const width = this.medias[0].width; 
//     // -1 moves left (content right), 1 moves right (content left)
//     this.scroll.target += direction * width; 
//     this.onCheck();
//   }

//   onTouchDown(e) {
//     this.isDown = true;
//     this.scroll.position = this.scroll.current;
//     this.start = e.touches ? e.touches[0].clientX : e.clientX;
//   }

//   onTouchMove(e) {
//     if (!this.isDown) return;
//     const x = e.touches ? e.touches[0].clientX : e.clientX;
//     const distance = (this.start - x) * (this.scrollSpeed * 0.025);
//     this.scroll.target = this.scroll.position + distance;
//   }

//   onTouchUp() {
//     this.isDown = false;
//     this.onCheck();
//   }

//   onWheel(e) {
//     const delta = e.deltaY || e.wheelDelta || e.detail;
//     this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
//     this.onCheckDebounce();
//   }

//   onCheck() {
//     if (!this.medias || !this.medias[0]) return;
//     const width = this.medias[0].width;
//     const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
//     const item = width * itemIndex;
//     this.scroll.target = this.scroll.target < 0 ? -item : item;
//   }

//   onResize() {
//     this.screen = {
//       width: this.container.clientWidth,
//       height: this.container.clientHeight
//     };
//     this.renderer.setSize(this.screen.width, this.screen.height);
//     this.camera.perspective({
//       aspect: this.screen.width / this.screen.height
//     });
//     const fov = (this.camera.fov * Math.PI) / 180;
//     const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
//     const width = height * this.camera.aspect;
//     this.viewport = { width, height };
//     if (this.medias) {
//       this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
//     }
//   }

//   update() {
//     this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
//     const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
//     if (this.medias) {
//       this.medias.forEach(media => media.update(this.scroll, direction));
//     }
//     this.renderer.render({ scene: this.scene, camera: this.camera });
//     this.scroll.last = this.scroll.current;
//     this.raf = window.requestAnimationFrame(this.update);
//   }

//   addEventListeners() {
//     window.addEventListener('resize', this.onResize);
//     window.addEventListener('mousewheel', this.onWheel);
//     window.addEventListener('wheel', this.onWheel);
//     window.addEventListener('mousedown', this.onTouchDown);
//     window.addEventListener('mousemove', this.onTouchMove);
//     window.addEventListener('mouseup', this.onTouchUp);
//     window.addEventListener('touchstart', this.onTouchDown);
//     window.addEventListener('touchmove', this.onTouchMove);
//     window.addEventListener('touchend', this.onTouchUp);
//   }

//   destroy() {
//     window.cancelAnimationFrame(this.raf);
//     window.removeEventListener('resize', this.onResize);
//     window.removeEventListener('mousewheel', this.onWheel);
//     window.removeEventListener('wheel', this.onWheel);
//     window.removeEventListener('mousedown', this.onTouchDown);
//     window.removeEventListener('mousemove', this.onTouchMove);
//     window.removeEventListener('mouseup', this.onTouchUp);
//     window.removeEventListener('touchstart', this.onTouchDown);
//     window.removeEventListener('touchmove', this.onTouchMove);
//     window.removeEventListener('touchend', this.onTouchUp);
//     if (this.renderer && this.renderer.gl && this.renderer.gl.canvas && this.renderer.gl.canvas.parentNode) {
//       this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
//     }
//   }
// }

// function autoBind(instance) {
//   const proto = Object.getPrototypeOf(instance);
//   Object.getOwnPropertyNames(proto).forEach(key => {
//     if (key !== 'constructor' && typeof instance[key] === 'function') {
//       instance[key] = instance[key].bind(instance);
//     }
//   });
// }

// const CircularGallery = forwardRef(({
//   items,
//   bend = 1,
//   borderRadius = 0.05,
//   scrollSpeed = 2,
//   scrollEase = 0.05
// }, ref) => { 
//   const containerRef = useRef(null);
//   const [app, setApp] = useState(null); 

//   useEffect(() => {
//     if (!containerRef.current || !items || items.length === 0) return;

//     const newApp = new App(containerRef.current, { items, bend, borderRadius, scrollSpeed, scrollEase });
//     setApp(newApp);

//     return () => {
//       newApp.destroy();
//     };
//   }, [items, bend, borderRadius, scrollSpeed, scrollEase]);

//   useImperativeHandle(ref, () => ({
//     moveLeft: () => {
//       // Note: move(-1) usually moves target left, showing right items. Adjust sign if needed.
//       if (app) app.move(-1); 
//     },
//     moveRight: () => {
//       if (app) app.move(1); 
//     }
//   }));

//   return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;
// });

// export default CircularGallery;

import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

// --- OGL Helper Functions ---

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  let line = '';
  let testLine, metrics, testWidth;
  
  const truncatedText = text.length > 150 ? text.substring(0, 150) + '...' : text;
  const truncatedWords = truncatedText.split(' ');

  for (let n = 0; n < truncatedWords.length; n++) {
    testLine = line + truncatedWords[n] + ' ';
    metrics = context.measureText(testLine);
    testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = truncatedWords[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    viewport,
    bend,
    borderRadius = 0,
    customerName,
    customerDesignation,
    testimonialText,
    rating 
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image; 
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;
    this.customerName = customerName;
    this.customerDesignation = customerDesignation;
    this.testimonialText = testimonialText;
    this.rating = rating || 5; 

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true
    });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha * color.a);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });

    // --- CARD BAKING LOGIC ---
    const avatarImg = new Image();
    avatarImg.crossOrigin = 'anonymous';
    avatarImg.src = this.image;

    const drawCard = (img) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Card dimensions
      const cardWidth = 512;
      const cardHeight = 384; 
      const padding = 30;
      canvas.width = cardWidth;
      canvas.height = cardHeight;

      // 1. Draw rounded background
      ctx.fillStyle = '#1A202C'; 
      drawRoundedRect(ctx, 0, 0, cardWidth, cardHeight, 20);
      ctx.fill();

      // 2. Draw Avatar
      const avatarSize = 80;
      if (img) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(padding + avatarSize / 2, padding + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
        ctx.clip();
        ctx.drawImage(img, padding, padding, avatarSize, avatarSize);
        ctx.restore();
      }

      // 3. Draw Name
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px sans-serif';
      const nameX = padding + avatarSize + 20;
      const nameY = padding + 35;
      ctx.fillText(this.customerName || 'Anonymous', nameX, nameY);

      // 4. Draw Designation
      ctx.fillStyle = '#A0AEC0'; 
      ctx.font = '18px sans-serif';
      const desigY = padding + 60;
      ctx.fillText(this.customerDesignation || 'Customer', nameX, desigY);

      // 5. Draw Stars
      const starSpacing = 28; 
      const starY = padding + 85; 
      const starXStart = nameX; 

      for (let i = 0; i < 5; i++) {
        const color = i < this.rating ? '#FBBF24' : '#4A5568'; 
        drawStar(ctx, starXStart + (i * starSpacing), starY, 5, 10, 5, color);
      }

      // 6. Draw Testimonial Text
      ctx.fillStyle = '#E2E8F0'; 
      ctx.font = '20px italic sans-serif';
      const textY = padding + avatarSize + 50; 
      const textX = padding;
      const maxWidth = cardWidth - (padding * 2);
      const lineHeight = 28;
      
      const fullTestimonial = `"${this.testimonialText || 'No feedback provided.'}"`;
      wrapText(ctx, fullTestimonial, textX, textY, maxWidth, lineHeight);

      // 7. Update the OGL texture
      texture.image = canvas;
      this.program.uniforms.uImageSizes.value = [canvas.width, canvas.height];
    };

    avatarImg.onload = () => drawCard(avatarImg);
    avatarImg.onerror = () => {
      console.warn('Failed to load avatar, drawing fallback.');
      drawCard(null);
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  // --- UPDATED RESIZE LOGIC (FIXED DESKTOP OVERLAP) ---
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }

    // Calculate scale based on screen width/height
    const isMobile = this.screen.width < 768;
    
    if (isMobile) {
      // Mobile: Use width-based scaling
      this.scale = this.screen.width / 1400; 
    } else {
      // Desktop: Use height-based scaling
      // Increased divisor from 1500 to 2000 to make cards slightly smaller on desktop
      this.scale = this.screen.height / 2000; 
    }
    
    // Calculate plane dimensions
    const planeHeight = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    const planeWidth = planeHeight * (4 / 3); // Maintain 4:3 aspect ratio

    this.plane.scale.y = planeHeight;
    this.plane.scale.x = planeWidth;
    
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    
    // --- PADDING FIX ---
    // Instead of a fixed number, we make padding proportional to the card width.
    // This ensures that if cards are wide (desktop), the gap grows with them.
    const gapPercentage = isMobile ? 0.1 : 0.15; // 10% gap on mobile, 15% on desktop
    this.padding = isMobile ? 1.5 : planeWidth * gapPercentage;
    
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(
    container,
    {
      items,
      bend,
      borderRadius = 0,
      scrollSpeed = 2,
      scrollEase = 0.05
    } = {}
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);

    autoBind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, borderRadius);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }

  createMedias(items, bend = 1, borderRadius) {
    this.mediasImages = items.concat(items);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        borderRadius,
        customerName: data.customer_name,
        customerDesignation: data.customer_designation,
        testimonialText: data.testimonial_text,
        rating: data.rating 
      });
    });
  }

  // --- CONTROLS ---
  move(direction) {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width; 
    this.scroll.target += direction * width; 
    this.onCheck();
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update);
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousewheel', this.onWheel);
    window.addEventListener('wheel', this.onWheel);
    window.addEventListener('mousedown', this.onTouchDown);
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);
    window.addEventListener('touchstart', this.onTouchDown);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousewheel', this.onWheel);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousedown', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);
    window.removeEventListener('touchstart', this.onTouchDown);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

const CircularGallery = forwardRef(({
  items,
  bend = 1,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05
}, ref) => { 
  const containerRef = useRef(null);
  const [app, setApp] = useState(null); 

  useEffect(() => {
    if (!containerRef.current || !items || items.length === 0) return;

    const newApp = new App(containerRef.current, { items, bend, borderRadius, scrollSpeed, scrollEase });
    setApp(newApp);

    return () => {
      newApp.destroy();
    };
  }, [items, bend, borderRadius, scrollSpeed, scrollEase]);

  useImperativeHandle(ref, () => ({
    moveLeft: () => {
      if (app) app.move(-1); 
    },
    moveRight: () => {
      if (app) app.move(1); 
    }
  }));

  return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;
});

export default CircularGallery;