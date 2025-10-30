// SVGs detalhados dos planetas
const planetasSVG = {
    mercurio: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="mercurio-grad">
                <stop offset="0%" style="stop-color:#b8b8b8;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#6a6a6a;stop-opacity:1" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#mercurio-grad)"/>
        <circle cx="35" cy="30" r="3" fill="#8a8a8a" opacity="0.6"/>
        <circle cx="60" cy="45" r="4" fill="#8a8a8a" opacity="0.6"/>
        <circle cx="40" cy="65" r="2" fill="#8a8a8a" opacity="0.6"/>
        <circle cx="70" cy="35" r="5" fill="#8a8a8a" opacity="0.5"/>
    </svg>`,

    venus: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="venus-grad">
                <stop offset="0%" style="stop-color:#ffd97d;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#e6a85c;stop-opacity:1" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#venus-grad)"/>
        <ellipse cx="30" cy="40" rx="15" ry="8" fill="#f5c97a" opacity="0.4"/>
        <ellipse cx="65" cy="55" rx="20" ry="10" fill="#f5c97a" opacity="0.3"/>
        <ellipse cx="40" cy="70" rx="18" ry="9" fill="#f5c97a" opacity="0.35"/>
    </svg>`,

    terra: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="terra-grad">
                <stop offset="0%" style="stop-color:#6fa8dc;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2b5a99;stop-opacity:1" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#terra-grad)"/>
        <path d="M20,35 Q25,30 35,32 T45,35 Q50,37 48,42 T40,50 Q35,52 30,48 Z" fill="#4caf50" opacity="0.8"/>
        <path d="M55,25 Q65,23 70,28 T75,38 Q73,43 68,42 Z" fill="#4caf50" opacity="0.8"/>
        <path d="M25,60 Q30,58 38,60 T48,65 Q52,68 50,72 T40,75 Q32,73 28,68 Z" fill="#4caf50" opacity="0.8"/>
        <circle cx="70" cy="65" r="8" fill="#4caf50" opacity="0.8"/>
        <ellipse cx="40" cy="40" rx="20" ry="10" fill="white" opacity="0.3"/>
    </svg>`,

    marte: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="marte-grad">
                <stop offset="0%" style="stop-color:#ff8566;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#c44f3a;stop-opacity:1" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#marte-grad)"/>
        <circle cx="35" cy="35" r="4" fill="#d66b56" opacity="0.7"/>
        <circle cx="60" cy="40" r="6" fill="#d66b56" opacity="0.7"/>
        <circle cx="45" cy="60" r="3" fill="#d66b56" opacity="0.7"/>
        <ellipse cx="70" cy="60" rx="8" ry="5" fill="#d66b56" opacity="0.6"/>
        <path d="M30,50 Q35,48 40,50 T50,52" stroke="#b8573f" stroke-width="1" fill="none" opacity="0.5"/>
    </svg>`,

    jupiter: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="jupiter-grad">
                <stop offset="0%" style="stop-color:#e6c199;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#c89a6a;stop-opacity:1" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#jupiter-grad)"/>
        <ellipse cx="50" cy="30" rx="40" ry="5" fill="#d4a373" opacity="0.7"/>
        <ellipse cx="50" cy="45" rx="42" ry="6" fill="#c89a6a" opacity="0.6"/>
        <ellipse cx="50" cy="60" rx="41" ry="5" fill="#d4a373" opacity="0.7"/>
        <ellipse cx="50" cy="75" rx="38" ry="4" fill="#c89a6a" opacity="0.6"/>
        <circle cx="65" cy="45" r="7" fill="#e8947d" opacity="0.9"/>
        <circle cx="65" cy="45" r="5" fill="#c4715f" opacity="0.8"/>
    </svg>`,

    saturno: `<svg viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="saturno-grad">
                <stop offset="0%" style="stop-color:#f5deb3;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#c9a561;stop-opacity:1" />
            </radialGradient>
            <linearGradient id="anel-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#e6d5a0;stop-opacity:0.3" />
                <stop offset="30%" style="stop-color:#e6d5a0;stop-opacity:0.9" />
                <stop offset="50%" style="stop-color:#c9a561;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#e6d5a0;stop-opacity:0.9" />
                <stop offset="100%" style="stop-color:#e6d5a0;stop-opacity:0.3" />
            </linearGradient>
        </defs>
        <ellipse cx="70" cy="50" rx="60" ry="15" fill="url(#anel-grad)" opacity="0.6"/>
        <ellipse cx="70" cy="50" rx="50" ry="12" fill="none" stroke="#b89550" stroke-width="1" opacity="0.4"/>
        <circle cx="70" cy="50" r="28" fill="url(#saturno-grad)"/>
        <ellipse cx="70" cy="50" rx="45" ry="11" fill="url(#anel-grad)" opacity="0.8"/>
    </svg>`,

    urano: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="urano-grad">
                <stop offset="0%" style="stop-color:#a8d8ea;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#6ba3b8;stop-opacity:1" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#urano-grad)"/>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#91c5d4" stroke-width="0.5" opacity="0.4"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#91c5d4" stroke-width="0.5" opacity="0.3"/>
        <ellipse cx="40" cy="40" rx="15" ry="8" fill="#91c5d4" opacity="0.2"/>
    </svg>`,

    netuno: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="netuno-grad">
                <stop offset="0%" style="stop-color:#5b7db1;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#3d5a80;stop-opacity:1" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#netuno-grad)"/>
        <ellipse cx="55" cy="35" rx="18" ry="12" fill="#4a6a95" opacity="0.5"/>
        <ellipse cx="40" cy="55" rx="15" ry="10" fill="#4a6a95" opacity="0.4"/>
        <path d="M30,40 Q35,38 40,40" stroke="#6b8db8" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M55,60 Q60,58 65,60" stroke="#6b8db8" stroke-width="1.5" fill="none" opacity="0.5"/>
    </svg>`
};
