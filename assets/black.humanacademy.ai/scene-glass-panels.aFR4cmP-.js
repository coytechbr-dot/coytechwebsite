function e(e,{host:t,root:n,count:r,interactive:i=!0,onFailure:a}){let o=[],s=[],c=0,l=!1,u,d=()=>{l||(l=!0,cancelAnimationFrame(c),s.forEach(e=>e()),o.forEach(e=>e.dispose()),u?.dispose(),u?.domElement.remove(),delete t.dataset.sceneReady,delete n.dataset.sceneReady)};try{let f=getComputedStyle(t),p=(t,n)=>new e.Color(f.getPropertyValue(t).trim()||f.getPropertyValue(n).trim()),m=p(`--black-glass-blue`,`--color-surface-sunken`),h=p(`--black-glass-ice`,`--color-ink`),g=p(`--color-surface`,`--color-surface-sunken`),_=p(`--color-ink`,`--black-spoiler-metal`),v=f.getPropertyValue(`--duration-quick`).trim(),ee=Math.max(.1,Number.parseFloat(v)/(v.endsWith(`ms`)?1e3:1)),te=window.matchMedia(`(hover: hover) and (pointer: fine)`),ne=window.matchMedia(`(max-width: 767px)`),y=Math.max(1,Math.min(r,5));u=new e.WebGLRenderer({alpha:!0,antialias:!0,powerPreference:`low-power`,preserveDrawingBuffer:!1});let b=u;b.setClearColor(g,0),b.setPixelRatio(Math.min(window.devicePixelRatio,ne.matches?1:1.5)),b.outputColorSpace=e.SRGBColorSpace,b.toneMapping=e.ACESFilmicToneMapping,b.toneMappingExposure=.95,b.transmissionResolutionScale=.5,t.appendChild(b.domElement);let x=new e.Scene,S=new e.PerspectiveCamera(40,1,.1,80);S.position.set(0,0,15.5);let C=new e.Scene;C.background=g;let w=new e.PlaneGeometry(1,1);o.push(w);let T=[],E=(t,n,r,i)=>{let a=new e.MeshBasicMaterial({color:t.clone().multiplyScalar(n),side:e.DoubleSide,toneMapped:!1});T.push(a),o.push(a);let s=new e.Mesh(w,a);s.position.set(...r),s.scale.set(i[0],i[1],1),s.lookAt(0,0,0),C.add(s)};E(h,.9,[-6,2,5],[2,12]),E(m,8,[5,1,2],[5,10]),E(_,.5,[0,8,1],[12,.7]),E(h,.8,[2,-5,-4],[8,2]),E(m,6,[-3,0,-8],[7,8]);let D=new e.PMREMGenerator(b);o.push(D);let O=D.fromScene(C,.015,.1,40);D.dispose(),w.dispose(),T.forEach(e=>e.dispose());for(let e of[D,w,...T]){let t=o.indexOf(e);t!==-1&&o.splice(t,1)}x.environment=O.texture,o.push(O),x.add(new e.AmbientLight(h,.3));let k=new e.DirectionalLight(_,.5);k.position.set(-4,6,8),x.add(k);let A=new e.DirectionalLight(m,3);A.position.set(6,2,4),x.add(A);let j=new e.PlaneGeometry(34,22),M=new e.ShaderMaterial({uniforms:{uDark:{value:g},uBlue:{value:m},uIce:{value:h}},depthWrite:!1,vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec2 vUv;
        uniform vec3 uDark;
        uniform vec3 uBlue;
        uniform vec3 uIce;
        void main() {
          float left = exp(-length((vUv - vec2(0.18, 0.47)) * vec2(6.0, 3.4)) * 2.8);
          float right = exp(-length((vUv - vec2(0.82, 0.62)) * vec2(5.4, 4.4)) * 2.2);
          float horizon = exp(-abs(vUv.y - 0.26) * 17.0) * 0.012;
          vec3 color = uDark + uBlue * (left + right) * 0.26 + uIce * horizon;
          gl_FragColor = vec4(color, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `}),N=new e.Mesh(j,M);N.position.z=-7,x.add(N),o.push(j,M);let P=new e.Shape;P.moveTo(-.5,-.5),P.lineTo(.5,-.5),P.lineTo(.5,.5),P.lineTo(-.5,.5),P.closePath();let F=new e.ExtrudeGeometry(P,{depth:.08,steps:1,bevelEnabled:!0,bevelSegments:3,bevelSize:.005,bevelThickness:.004,curveSegments:1});F.center();let re=new e.EdgesGeometry(F,28),ie=new e.PlaneGeometry(1,1);o.push(F,re,ie);let I=[{center:[55/735,235/414],size:[175/735,235/414],depth:1.1,rotation:[.02,.28,-.69]},{center:[245/735,200/414],size:[70/735,220/414],depth:-.4,rotation:[.02,.42,.16]},{center:[398/735,180/414],size:[195/735,255/414],depth:-1.5,rotation:[.03,-.24,.21]},{center:[550/735,150/414],size:[135/735,200/414],depth:1.6,rotation:[.02,-.77,.01]},{center:[710/735,100/414],size:[150/735,260/414],depth:-.1,rotation:[.04,.35,.25]}],L=Array.from({length:y},(t,n)=>{let r=I[n],i=new e.Group,a=new e.MeshPhysicalMaterial({color:m.clone().lerp(h,.28),roughness:.045,metalness:0,transmission:.98,thickness:.32,ior:1.46,attenuationColor:m,attenuationDistance:4.8,clearcoat:1,clearcoatRoughness:.035,envMapIntensity:.74,side:e.DoubleSide}),s=new e.Mesh(F,a);s.scale.set(1,1,5.8),i.add(s);let c=new e.LineBasicMaterial({color:h,transparent:!0,opacity:n===4?.13:.24,depthWrite:!1}),l=new e.LineSegments(re,c);l.scale.copy(s.scale),i.add(l);let u=new e.ShaderMaterial({uniforms:{uIce:{value:h},uBlue:{value:m},uTime:{value:n*2.1},uActive:{value:0}},transparent:!0,depthWrite:!1,side:e.DoubleSide,blending:e.AdditiveBlending,vertexShader:`
          varying vec2 vUv;
          varying vec3 vView;
          varying vec3 vNormal;
          void main() {
            vUv = uv;
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            vView = -viewPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * viewPosition;
          }
        `,fragmentShader:`
          varying vec2 vUv;
          varying vec3 vView;
          varying vec3 vNormal;
          uniform vec3 uIce;
          uniform vec3 uBlue;
          uniform float uTime;
          uniform float uActive;
          void main() {
            float offset = sin(uTime * 0.22) * 0.32;
            float diagonal = vUv.x + vUv.y * 0.48 - 0.72 + offset;
            float streak = exp(-pow(diagonal * 5.5, 2.0));
            float core = exp(-abs(diagonal) * 46.0);
            float echo = exp(-pow((diagonal + 0.28) * 8.0, 2.0));
            float edge = pow(1.0 - vUv.x, 14.0) + pow(vUv.y, 16.0) * 0.5;
            float edgeDistance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
            float edgeGlow = exp(-edgeDistance * 95.0);
            float fade = smoothstep(0.0, 0.015, vUv.y) * smoothstep(0.0, 0.015, 1.0-vUv.y);
            float innerGlow = exp(-pow((vUv.x + vUv.y * 0.7 - 0.76 + offset * 0.4) * 2.8, 2.0));
            float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
            vec3 reflectedBlue = uBlue * (0.08 + innerGlow * 7.5 + uActive * 0.35);
            vec3 reflectedIce = uIce * (streak * 0.045 + core * 0.14 + echo * 0.01 + edge * 0.22 + edgeGlow * 0.2 + fresnel * 0.07);
            float strength = (0.075 + innerGlow * 0.22 + fresnel * 0.1 + edgeGlow * 0.12) * fade;
            gl_FragColor = vec4(reflectedBlue + reflectedIce, strength);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `}),d=new e.Mesh(ie,u);d.scale.set(1,1,1),d.position.z=.262,i.add(d),o.push(a,c,u);let f=new e.Vector3(0,0,r.depth),p=new e.Euler(...r.rotation);return i.position.copy(f),i.rotation.copy(p),x.add(i),{group:i,material:a,sheen:u,base:f,rotation:p,side:Math.sign(r.center[0]-.5),glass:s,edges:l,reflection:d}}),R=1,z=1,B=!1,V=0,H=0,U=0,W=n.dataset.scenePaused===`true`,G=!1,K=!1,q=L.map(()=>0),J=new e.Vector2,Y=new e.Vector2,X=.32,Z,ae=()=>{R=t.clientWidth||1,z=t.clientHeight||1,S.aspect=R/z,S.position.z=R<768?22:15.5,S.updateProjectionMatrix(),X=.32,L.forEach((t,n)=>{let r=I[n],i=S.position.z-r.depth,a=2*Math.tan(e.MathUtils.degToRad(S.fov/2))*i,o=a*S.aspect,s=Math.max(o,Math.min(735/414*a,o*2)),c=414/735*s;t.base.set((r.center[0]-.5)*s,(.5-r.center[1])*c,r.depth);let l=r.size[0]*s,u=r.size[1]*c;t.glass.scale.set(l,u,5.8),t.edges.scale.copy(t.glass.scale),t.reflection.scale.set(l,u,1);let d=(Math.abs(Math.cos(t.rotation.z)*Math.cos(t.rotation.y))*l+Math.abs(Math.sin(t.rotation.z))*u+.6)/(2*o);X=Math.max(X,d*1.3+.06)}),b.setPixelRatio(Math.min(window.devicePixelRatio,R<768?1:1.5)),b.setSize(R,z,!1),b.domElement.style.width=`100%`,b.domElement.style.height=`100%`,Z?.()};ae();let oe=new ResizeObserver(ae);oe.observe(t),s.push(()=>oe.disconnect());let se=()=>{if(!i){U=-1;return}let e=Number(n.dataset.sceneActive);U=Number.isInteger(e)?Math.min(y-1,Math.max(0,e)):0,G=n.dataset.sceneInput===`keyboard`||W};se();let Q=new MutationObserver(()=>{W=n.dataset.scenePaused===`true`,se(),$()});Q.observe(n,{attributes:!0,attributeFilter:i?[`data-scene-active`,`data-scene-input`,`data-scene-paused`]:[`data-scene-paused`]}),s.push(()=>Q.disconnect());let ce=e=>{if(!te.matches||e.pointerType===`touch`)return;let t=n.getBoundingClientRect();Y.set(((e.clientX-t.left)/t.width-.5)*2,((e.clientY-t.top)/t.height-.5)*2)},le=()=>Y.set(0,0);i&&(n.addEventListener(`pointermove`,ce,{passive:!0}),n.addEventListener(`pointerleave`,le,{passive:!0}),s.push(()=>{n.removeEventListener(`pointermove`,ce),n.removeEventListener(`pointerleave`,le)}));let ue=r=>{if(c=0,l||!B||document.hidden)return;let i=!W&&V?Math.min((r-V)/1e3,.05):0;V=r,H+=i;let o=1-Math.exp(-5*i/ee);J.lerp(Y,o),L.forEach((t,n)=>{let r=+(n===U),i=q[n],a=G?r:i+(r-i)*o;q[n]=a;let s=H*.13+n*1.73,c=2*Math.tan(e.MathUtils.degToRad(S.fov/2))*(S.position.z-t.base.z)*S.aspect,l=1+X*2,u=(((t.base.x/c+.5+X+H/20)%l+l)%l-X-.5)*c;t.group.position.set(u-t.side*a*.16+J.x*(.08+n*.018),t.base.y+Math.sin(s*.65)*.07-J.y*.08,t.base.z+Math.cos(s*.4)*.12+a*.2),t.group.rotation.set(t.rotation.x+J.y*.045,t.rotation.y-t.side*a*.055+J.x*.04,t.rotation.z+Math.cos(s*.7)*.012),t.group.rotateY(Math.sin(s*1.6)*.105),t.material.envMapIntensity=.74+a*.35,t.sheen.uniforms.uTime.value=H+n*2.1,t.sheen.uniforms.uActive.value=a}),G=!1;try{b.render(x,S)}catch{d(),a();return}K||(K=!0,t.dataset.sceneReady=`true`,n.dataset.sceneReady=`true`),W||(c=requestAnimationFrame(ue))},$=()=>{cancelAnimationFrame(c),c=0,V=0,!l&&B&&!document.hidden&&(c=requestAnimationFrame(ue))};Z=$;let de=new IntersectionObserver(([e])=>{B=!!e?.isIntersecting,$()},{threshold:0});de.observe(t),document.addEventListener(`visibilitychange`,$),s.push(()=>{de.disconnect(),document.removeEventListener(`visibilitychange`,$)});let fe=e=>{e.preventDefault(),d(),a()};return b.domElement.addEventListener(`webglcontextlost`,fe),s.push(()=>b.domElement.removeEventListener(`webglcontextlost`,fe)),d}catch(e){throw d(),e}}export{e as createGlassPanelsScene};