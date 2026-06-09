import Link from 'next/link'

interface BoneiLogoProps {
  /** 'dark' = navy icon + navy text (for light backgrounds)
   *  'light' = white icon + white text (for dark/navy backgrounds) */
  variant?: 'dark' | 'light'
  /** Show only the icon, no text */
  iconOnly?: boolean
  /** Wrap in a home-page link */
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { icon: 28, hebrewSize: 15, subSize: 9 },
  md: { icon: 38, hebrewSize: 20, subSize: 11 },
  lg: { icon: 52, hebrewSize: 28, subSize: 13 },
}

export default function BoneiLogo({
  variant = 'dark',
  iconOnly = false,
  href,
  size = 'md',
}: BoneiLogoProps) {
  const color = variant === 'light' ? '#ffffff' : '#2C3E50'
  const subColor = variant === 'light' ? 'rgba(255,255,255,0.45)' : 'rgba(44,62,80,0.45)'
  const { icon, hebrewSize, subSize } = sizes[size]

  const inner = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: icon * 0.35 + 'px', textDecoration: 'none' }}>
      {/* House + palm icon */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* House outline */}
        <path
          d="M6 22L24 6L42 22V44H30V32H18V44H6V22Z"
          stroke={color}
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Palm trunk */}
        <line x1="24" y1="38" x2="24" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* Palm fronds */}
        <path d="M24 26 Q20 22 16 23" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M24 26 Q28 22 32 23" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M24 26 Q22 20 22 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M24 26 Q26 20 26 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>

      {!iconOnly && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            color,
            fontSize: hebrewSize,
            fontWeight: 300,
            letterSpacing: '0.01em',
            direction: 'rtl',
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            lineHeight: 1.2,
          }}>
            בוני ישראל
          </span>
          <span style={{
            color: subColor,
            fontSize: subSize,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            marginTop: '3px',
          }}>
            Bonei Yisrael
          </span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'inline-flex' }}>
        {inner}
      </Link>
    )
  }
  return inner
}
