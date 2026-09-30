/**
 * Academy visual tokens — SSOT: `.academy/DESIGN.md`
 */
export const academy = {
    canvas: 'bg-[#f6f5f4]',
    canvasHex: '#f6f5f4',
    shell: 'bg-white',
    sidebar: 'bg-white',
    surface: 'bg-white',
    ink: 'text-[#000000]',
    inkSecondary: 'text-[#31302e]',
    inkMuted: 'text-[#615d59]',
    inkFaint: 'text-[#a39e98]',
    border: 'border-[#e6e6e6]',
    cta: 'bg-[#f36827] text-white hover:bg-[#c44e1a]',
    ctaGhost:
        'border border-[#e6e6e6] bg-white text-[#000000] hover:bg-[#f6f5f4]',
    navIdle: 'text-[#31302e] hover:bg-[#f6f5f4]',
    navActive: 'bg-[#000000] text-white',
    iconIdle: 'text-[#615d59]',
    iconActive: 'text-white',
    radius: 'rounded-lg',
    card: 'rounded-2xl border border-[#e6e6e6] bg-white',
    input:
        'w-full min-h-11 rounded-lg border border-[#e6e6e6] bg-white px-3 text-sm text-[#000000] placeholder:text-[#a39e98] focus:border-[#f36827] focus:outline-none focus:ring-2 focus:ring-[#f36827]/25',
    select:
        'w-full min-h-11 rounded-lg border border-[#e6e6e6] bg-white px-3 text-sm text-[#000000] focus:border-[#f36827] focus:outline-none focus:ring-2 focus:ring-[#f36827]/25',
    overlay: 'bg-black/40',
    modal: 'rounded-2xl border border-[#e6e6e6] bg-white shadow-xl',
} as const;
