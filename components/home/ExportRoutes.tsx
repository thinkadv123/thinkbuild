"use client";

import { motion } from "framer-motion";

const hub = { x: 470, y: 250, label: "Egypt", sub: "Headquarters · New Cairo" };
const nodes = [
  { id: "eu", x: 290, y: 95, label: "Europe", sub: "EN-standard supply", path: "M470,250 Q330,170 290,95" },
  { id: "gulf", x: 680, y: 290, label: "Gulf Region", sub: "GCC infrastructure", path: "M470,250 Q600,200 680,290" },
  { id: "af", x: 330, y: 420, label: "Africa", sub: "Development projects", path: "M470,250 Q440,380 330,420" },
];

// Deterministic dotted backdrop suggesting land masses (no external map data).
const dots: { x: number; y: number }[] = [];
for (let y = 20; y < 480; y += 18) {
  for (let x = 20; x < 780; x += 18) {
    const eu = ((x - 300) / 190) ** 2 + ((y - 100) / 80) ** 2 < 1;
    const af = ((x - 360) / 150) ** 2 + ((y - 360) / 140) ** 2 < 1;
    const me = ((x - 620) / 150) ** 2 + ((y - 250) / 90) ** 2 < 1;
    if (eu || af || me) dots.push({ x, y });
  }
}

export function ExportRoutes() {
  return (
    <div className="relative">
      <svg viewBox="0 0 800 500" className="h-auto w-full" role="img" aria-label="Think Build export routes from Egypt to Europe, the Gulf region and Africa">
        <g fill="rgba(255,255,255,0.12)">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={1.6} />
          ))}
        </g>

        {nodes.map((n, i) => (
          <g key={n.id}>
            <motion.path
              d={n.path}
              fill="none"
              stroke="#e4dd16"
              strokeWidth={2}
              strokeDasharray="1 0"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.6, delay: 0.3 + i * 0.35, ease: [0.65, 0, 0.35, 1] }}
            />
            <circle r={4} fill="#fff">
              <animateMotion dur={`${3 + i * 0.6}s`} repeatCount="indefinite" path={n.path} begin={`${2 + i * 0.35}s`} />
            </circle>
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: 1.6 + i * 0.35, type: "spring", stiffness: 200, damping: 14 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <circle cx={n.x} cy={n.y} r={18} fill="rgba(228,221,22,0.15)">
                <animate attributeName="r" values="12;24;12" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx={n.x} cy={n.y} r={7} fill="#e4dd16" />
              <text x={n.x + 16} y={n.y - 12} fill="#fff" fontSize="20" fontWeight="800" fontFamily="var(--font-archivo)">
                {n.label}
              </text>
              <text x={n.x + 16} y={n.y + 8} fill="rgba(255,255,255,0.5)" fontSize="12">
                {n.sub}
              </text>
            </motion.g>
          </g>
        ))}

        <g>
          <circle cx={hub.x} cy={hub.y} r={30} fill="rgba(228,221,22,0.12)" />
          <circle cx={hub.x} cy={hub.y} r={12} fill="#e4dd16" stroke="#1a191d" strokeWidth={4} />
          <text x={hub.x + 22} y={hub.y + 34} fill="#e4dd16" fontSize="20" fontWeight="800" fontFamily="var(--font-archivo)">
            {hub.label}
          </text>
          <text x={hub.x + 22} y={hub.y + 52} fill="rgba(255,255,255,0.5)" fontSize="12">
            {hub.sub}
          </text>
        </g>
      </svg>
    </div>
  );
}
