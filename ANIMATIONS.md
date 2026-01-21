# Animations

## CSS Keyframes (src/app/globals.css)
- `fadeInDown` - Fade in from top
- `fadeInUp` - Fade in from bottom
- `slideInLeft` - Slide in from left
- `slideInRight` - Slide in from right
- `rotateToStraight` - Rotate cards to straight
- `scaleIn` - Scale up

## AnimatedSection Component
Wrapper that triggers animations when section scrolls into view.

**Animations applied:**
- h2 elements: `fadeInDown`
- Grid items (`.grid-animate > div`): `slideInLeft` with staggered delays
- Rotated cards (`[class*='rotate-']`): `rotateToStraight` with staggered delays

**Usage:**
```tsx
<AnimatedSection>
  {/* Content */}
</AnimatedSection>
```

## Header/Navigation Animation
Fade in from top on page load.
