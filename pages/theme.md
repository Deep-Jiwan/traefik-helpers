# Traefik Dynamic Editor - Design System & Theme Guide

Complete design specification for the Traefik Dynamic Editor UI. This guide enables other developers and AI agents to perfectly replicate the styling, visual hierarchy, and interaction patterns used throughout the application.

---

## 1. Color Palette

### Base Colors
- **Background (Primary)**: `#081727` - Deep navy, used for main page background
- **Surface (01dp)**: `#1e2b39` - Slightly lighter navy, used for cards, modals, containers
- **Border/Divider**: `#2f3d4d` - Medium-dark blue-gray for borders and separators
- **Border Hover**: `#3a4a5c` - Slightly lighter border for hover states

### Primary Brand Colors
- **Primary Accent**: `#2aa2c1` - Bright cyan/turquoise, used for:
  - Primary buttons
  - Links and interactive elements
  - Focus rings
  - Icons for important actions
  - Hover states on secondary buttons
  
- **Primary Accent Hover**: `#238a9f` - Darker cyan, used for primary button hover states

### Text Colors
- **Primary Text**: `hsla(0, 0%, 100%, 0.74)` - Slightly dimmed white (~74% opacity), used for:
  - Main body text
  - Table content
  - Default labels
  
- **Secondary Text**: `hsla(0, 0%, 100%, 0.51)` - More dimmed white (~51% opacity), used for:
  - Descriptions
  - Placeholders
  - Table headers
  - Captions
  - Help text

- **White**: `#FFFFFF` - Pure white, used for:
  - Headings and titles
  - Button text
  - Important information

### Status/Semantic Colors
- **Success/Active**: `#30a46c` - Green, used for:
  - Success notifications
  - Positive status indicators
  - TLS enabled indicators
  
- **Success Border**: `#30a46c/40` - Success with 40% opacity for borders

- **Error/Danger**: `#dc3545` - Red, used for:
  - Delete buttons
  - Error notifications
  - Offline/failed status

- **Error (Alternative)**: `#b91c1c` - Darker red for button fill
- **Error Hover**: `#991b1b` - Even darker red for button hover
- **Error Display**: `rgb(220, 53, 69)` - Error badges and alerts

- **Auth/Security**: `rgb(42, 162, 193)` - Cyan, used for authentication indicators

### Neutral Colors
- **Gray (Disabled/Inactive)**: `#3a4a5c`, `#2f3d4d` - Used for disabled states

---

## 2. Typography

### Font Family
```
system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```
System fonts for optimal rendering across platforms.

### Font Weights & Sizes
- **H1**: `2.25rem` (36px), `font-weight: 700` (bold) - Page titles
- **H2**: `text-2xl`, `font-weight: 700` - Modal/section titles
- **H3**: `text-lg`, `font-weight: 600` - Subsection headers
- **Body**: `text-sm`, `font-weight: 400` - Default text
- **Label**: `text-xs`, `font-weight: 600` - Form labels, table headers
- **Small**: `text-xs`, `font-weight: 400` - Captions, descriptions

### Line Height
- Default: `1.5` - Standard line height for readability

### Text Rendering
- Font smoothing: `-webkit-font-smoothing: antialiased`
- Font smoothing: `-moz-osx-font-smoothing: grayscale`
- Text rendering: `optimizeLegibility`

---

## 3. Spacing System

### Padding & Margins (Tailwind scale)
- **Compact**: `px-2 py-1` or `px-3 py-2` - Small components (badges, tags)
- **Standard**: `px-4 py-2` - Buttons, form controls
- **Medium**: `px-6 py-4` - Section padding
- **Large**: `px-6 py-5` - Table cells, modal headers
- **Extra Large**: `p-6` - Container padding

### Gap/Spacing Between Elements
- **Compact**: `gap-1` - Small gaps between badges/tags (4px)
- **Small**: `gap-2` - Spacing in compact lists (8px)
- **Medium**: `gap-3` - Standard spacing between UI elements (12px)
- **Large**: `gap-4` - Larger groupings (16px)
- **Extra Large**: `mb-8` - Section separation (32px)

### Width/Height Rules
- **Icon size (small)**: `w-4 h-4` - Inline icons
- **Icon size (medium)**: `w-5 h-5` - Standard icons
- **Icon size (large)**: `w-6 h-6` - Header close buttons
- **Badge circle**: `w-9 h-9` - Status badges with icons
- **Scrollbar**: width `8px`, height `8px`

---

## 4. Border Radius & Shapes

### Border Radius
- **Small**: `rounded` (4px) - Scrollbar thumb
- **Medium**: `rounded-lg` (8px) - Buttons, input fields, small containers
- **Large**: `rounded-xl` (12px) - Cards, modals
- **Full**: `rounded-full` (9999px) - Badges and pills

### Border Styles
- **Standard**: `border` (1px solid)
- **Subtle**: `border-[#2f3d4d]` - Default divider
- **Semi-transparent**: `border-[color]/40` or `rgba(r, g, b, opacity)` - Soft borders

---

## 5. Shadows & Depth

### Shadow Levels
- **Light**: No shadow or `shadow` - Minimal elevation
- **Medium**: `shadow-md` - Used on cards and containers
- **Heavy**: `shadow-2xl` - Used on modals and overlays

### Shadow Applications
- Cards/Containers: `shadow-md`
- Modals: `shadow-2xl`
- Dropdowns: `shadow-2xl`

---

## 6. Components & Styling Patterns

### Buttons

#### Primary Button
```
bg-[#2aa2c1] hover:bg-[#238a9f] text-white
px-4 py-2 rounded-lg font-medium
transition-colors
focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#2aa2c1]
disabled:opacity-50 disabled:cursor-not-allowed
```

#### Secondary Button
```
border border-[#2f3d4d] text-white hover:bg-[hsla(206,100%,50%,0.04)]
px-4 py-2 rounded-lg font-medium
transition-colors
focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#2aa2c1]
disabled:opacity-50 disabled:cursor-not-allowed
```

#### Danger Button
```
bg-[#b91c1c] hover:bg-[#991b1b] text-white
px-4 py-2 rounded-lg font-medium
transition-colors
focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#b91c1c]
disabled:opacity-50 disabled:cursor-not-allowed
```

### Checkboxes
- **Unchecked**: 
  - Background: `bg-[#081727]`
  - Border: `border-2 border-[#2f3d4d]`
  - Hover: `group-hover:border-[#2aa2c1]/50`
- **Checked**:
  - Background: `bg-[#2aa2c1]`
  - Border: `border-2 border-[#2aa2c1]`
  - Icon: `FiCheck` white with `strokeWidth={3}`
- **Transitions**: `transition-all duration-200`
- **Size**: `w-5 h-5` with `rounded`
- **Disabled**: `opacity-50 cursor-not-allowed`

### Cards/Containers
```
bg-[#1e2b39] rounded-xl shadow-md
border border-[#2f3d4d]
p-6 or px-6 py-5 (varies by context)
```

### Tables
- **Background**: `bg-[#1e2b39]`
- **Header**:
  - Background: `bg-[#1e2b39]`
  - Border bottom: `border-b border-[#2f3d4d]`
  - Text: `text-[hsla(0,0%,100%,0.51)] text-xs font-medium uppercase tracking-wider`
- **Row Hover**: `hover:bg-[hsla(206,100%,50%,0.04)]` with `transition-colors`
- **Cell Padding**: `px-6 py-5`

### Badges/Pills
```
px-2 py-1 text-xs rounded-full
background: rgba(255, 255, 255, 0.08)
color: rgba(255, 255, 255, 0.65)
border: 1px solid rgba(255, 255, 255, 0.65)
```

### Status Badges (Circular Icons)
```
w-9 h-9 rounded-lg flex items-center justify-center
Status-specific background color
Icon: w-5 h-5 text-white
```

### Input Fields & Textareas
- **Font**: Inherit from parent
- **Accent color**: `accent-color: #2aa2c1` (for checkboxes)

### Focus States
```
*:focus-visible {
  outline: 2px solid #2aa2c1;
  outline-offset: 2px;
}
```

---

## 7. Animations & Transitions

### Transition Classes
- **Colors**: `transition-colors` - Smooth color changes (200ms default)
- **All properties**: `transition-all duration-200` - Multi-property animations
- **Opacity**: `transition-opacity duration-200` - Fade effects
- **Position**: Framer Motion for complex animations

### Common Animation Patterns

#### Fade In (Toast Notifications)
```
Initial state: opacity-0 -translate-y-1
Active state: opacity-100 translate-y-0
Duration: 250ms (custom)
```

#### Hover Effects
- **Links**: `hover:text-[#2aa2c1]` with `transition-colors`
- **Buttons**: Background color changes on hover
- **Rows**: `hover:bg-[hsla(206,100%,50%,0.04)]` subtle background shift

#### Modal/Overlay
- **Backdrop**: `backdrop-filter: blur(8px)` with `bg-black/30`
- **Fade in**: Subtle opacity/scale transition

#### Loading States
- **Disabled**: `disabled:opacity-50 disabled:cursor-not-allowed`

### Transition Duration Scale
- **Quick**: `200ms` - Default for most interactions
- **Standard**: `250ms` - Slightly longer for more visible changes
- **Custom**: Specified inline where needed

---

## 8. Icon Usage

### Icon Library
**React Icons (Feather icons - `react-icons/fi`)**

### Common Icons & Usage
| Icon | Component | Purpose |
|------|-----------|---------|
| `FiPlus` | Buttons, Actions | Add/Create new |
| `FiEdit` | Actions | Edit existing |
| `FiTrash2` | Actions | Delete (styled red) |
| `FiX` | Close buttons, Modals | Close/Dismiss |
| `FiExternalLink` | Links | External URL indicator |
| `FiRefreshCw` | Actions | Refresh/Reload |
| `FiSearch` | Inputs | Search icon |
| `FiAlertTriangle` | Status | Warning/Error status |
| `FiShield` | Status | Authentication/Security |
| `FiCheckCircle` | Toast | Success notification |
| `FiAlertCircle` | Toast | Error notification |
| `FiInfo` | Toast | Info notification |
| `FiFileText` | Empty state | No data indicator |

### Icon Sizing
- **Inline (small)**: `w-4 h-4` - In buttons, tables
- **Standard**: `w-5 h-5` - Status badges
- **Large**: `w-6 h-6` - Close buttons in modals
- **Header**: `w-12 h-12` - Empty state placeholder

### Icon Colors
- **Default**: `text-white` - Most interactive icons
- **Primary**: `text-[#2aa2c1]` - Important/active states
- **Error**: `text-[#dc3545]` or `rgb(220, 53, 69)` - Danger actions
- **Success**: `text-[#30a46c]` - Positive indicators
- **Subtle**: `text-gray-400` - Secondary information

### Icon Opacity & Styling
```tsx
// Standard icon
<FiPlus className="w-4 h-4 text-white" />

// Icon with custom stroke
<FiCheck className="w-3.5 h-3.5 text-white" strokeWidth={3} />

// Icon in button context (uses inherited color)
<FiExternalLink className="ml-1 text-[#2aa2c1]" size={14} />
```

---

## 9. Layout & Structure

### Page Layout
- **Background**: Full viewport with `bg-[#081727]`
- **Content**: Centered with responsive margins
- **Breakpoints**: Tailwind defaults (md: 768px for responsive grids)

### Grid Systems
- **Entry Points**: `grid grid-cols-1 md:grid-cols-3 gap-4` - Responsive columns
- **Tables**: `w-full min-w-max` - Full width with horizontal scroll on small screens

### Z-Index Hierarchy
- **Base**: `0`
- **Modals/Overlays**: `z-50`
- **Toast Notifications**: `z-[9999]` - Above all other content
- **Dropdown/Tooltips**: Context-dependent, typically `z-50`

### Responsive Design
- **Mobile First**: Use Tailwind's responsive prefixes (e.g., `md:`, `lg:`)
- **Min-width constraints**: `min-w-max` for horizontal scrolling tables
- **Overflow handling**: `overflow-x-auto` for content that exceeds viewport

---

## 10. Modal & Dialog Patterns

### Modal Structure
```
Overlay:
  - Position: fixed inset-0
  - Background: bg-black/30 with backdrop-filter: blur(8px)
  - Z-index: z-50

Content Container:
  - Background: bg-[#1e2b39]
  - Border: border border-[#2f3d4d]
  - Radius: rounded-xl
  - Shadow: shadow-2xl
  - Max width: max-w-2xl
  - Width: w-full mx-4
  - Height: max-h-[90vh] overflow-y-auto

Header:
  - Padding: p-6
  - Border bottom: border-b border-[#2f3d4d]
  - Title: text-2xl font-bold text-white
  - Description: text-sm text-[hsla(0,0%,100%,0.51)] mt-1

Body:
  - Padding: p-6
  - Content overflow handling: overflow-x-hidden

Close Button:
  - Position: Absolute top-right (within header)
  - Color: text-gray-400 hover:text-white
  - Icon: FiX w-6 h-6
  - Transition: transition-colors
```

---

## 11. Toast Notifications

### Toast Container
- **Position**: `fixed top-32 right-10`
- **Z-index**: `z-[9999]`
- **Layout**: `flex flex-col gap-3 items-end`
- **Width**: `max-w-xs w-auto`
- **Pointer events**: `pointer-events-none` on container (each toast is `pointer-events-auto`)

### Toast Item Styling

#### Success Toast
```
Background: bg-[#1e2b39]
Border: border border-[#30a46c]/40
Icon text: text-[#30a46c]
Icon: FiCheckCircle
```

#### Error Toast
```
Background: bg-[#1e2b39]
Border: border border-[#dc3545]/40
Icon text: text-[#ff6b6b]
Icon: FiAlertCircle
```

#### Info Toast
```
Background: bg-[#1e2b39]
Border: border border-[#2aa2c1]/40
Icon text: text-[#2aa2c1]
Icon: FiInfo
```

### Toast Animation
```
Initial: opacity-0 translate-y-1
Show: opacity-100 translate-y-0
Close: opacity-0 translate-y-1 (after delay)
Duration: 200ms transition, 250ms close animation
Auto-dismiss: 3000ms (3 seconds)
```

---

## 12. Scrollbar Styling

### Custom Scrollbar (Dark Theme)
```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #081727;
}

::-webkit-scrollbar-thumb {
  background: #2f3d4d;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3a4a5c;
}
```

---

## 13. Connection & Status Indicators

### Connection Status Component
```
Container:
  - Connected: bg-[#1e2b39] text-white
  - Error: bg-red-100 text-red-800
  - Disconnected: bg-gray-100 text-gray-600

Dot indicator (w-2 h-2 rounded-full):
  - Connected: bg-green-500
  - Disconnected: bg-gray-400
  - Error: bg-red-500
  - Connecting: bg-gray-400

Text size: text-sm
Layout: flex items-center gap-2 px-4 py-2 rounded-lg font-medium
```

### Service Status Badge
```
w-9 h-9 rounded-lg flex items-center justify-center
text-white w-5 h-5 icon

Status colors:
  - AUTH: rgb(42, 162, 193) - Cyan
  - ERROR: rgb(220, 53, 69) - Red
  - HEALTHY: (implied green)
```

---

## 14. Form Elements

### Input Fields
- **Font family**: Inherit from parent
- **Transitions**: Applied to interactive states
- **Cursor**: Standard input cursor

### Textarea
- **Font family**: Inherit from parent
- **Resize**: Handled by container overflow settings

### Select Dropdowns
- **Font family**: Inherit from parent
- **Styling**: Browser default (can be customized with custom styles if needed)

---

## 15. CSS Custom Properties

### Defined Variables
```css
:root {
  --colors-01dp: #1e2b39;  /* Surface/01dp elevation color */
}
```

### Usage
- Applied to Entry Points List container
- Can be extended for additional theme variables

---

## 16. Implementation Notes

### Tailwind CSS Configuration
- **Utility-first approach**: Uses Tailwind's built-in utilities
- **Custom colors**: Uses hex colors directly in classes (e.g., `bg-[#2aa2c1]`)
- **Opacity modifiers**: `[color]/[opacity]` syntax for transparency
- **Arbitrary values**: Square bracket notation for non-standard values

### Dark Theme
- Entire application uses dark theme (navy/dark blue)
- No light mode support currently
- All text optimized for dark backgrounds

### Accessibility Considerations
- Focus rings visible and prominent (`outline: 2px solid #2aa2c1`)
- Sufficient color contrast maintained throughout
- Disabled states clearly indicated
- Icons paired with text labels where necessary

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Font smoothing applied for cross-platform consistency
- Custom scrollbars for WebKit browsers

---

## 17. Quick Reference: Color Usage Cheat Sheet

| Purpose | Color | Use Case |
|---------|-------|----------|
| **Main Background** | `#081727` | Page/viewport background |
| **Surface** | `#1e2b39` | Cards, containers, modals |
| **Borders** | `#2f3d4d` | Dividers, inactive states |
| **Primary Brand** | `#2aa2c1` | Buttons, links, accents |
| **Primary Hover** | `#238a9f` | Button hover state |
| **Success** | `#30a46c` | Success messages, positive status |
| **Danger** | `#dc3545` / `#b91c1c` | Errors, delete actions |
| **Auth/Secure** | `rgb(42, 162, 193)` | Security indicators |
| **Primary Text** | `hsla(0,0%,100%,0.74)` | Body text |
| **Secondary Text** | `hsla(0,0%,100%,0.51)` | Labels, descriptions |
| **White** | `#FFFFFF` | Headings, titles |

---

## 18. Complete Example Component Structure

```tsx
// Example: Complete styled component following all patterns

export const ExampleComponent = () => {
  return (
    <div className="bg-[#1e2b39] rounded-xl border border-[#2f3d4d] p-6 shadow-md">
      {/* Header */}
      <h2 className="text-2xl font-bold text-white mb-4">Title</h2>
      
      {/* Subtitle/Description */}
      <p className="text-sm text-[hsla(0,0%,100%,0.51)] mb-6">Description text</p>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Item */}
        <div className="px-4 py-3 rounded-lg bg-[hsla(206,100%,50%,0.04)]">
          <span className="text-xs uppercase tracking-wider text-[hsla(0,0%,100%,0.51)]">Label</span>
          <p className="text-sm text-[hsla(0,0%,100%,0.74)] mt-1">Content</p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2 justify-end">
        <button className="px-4 py-2 rounded-lg border border-[#2f3d4d] text-white hover:bg-[hsla(206,100%,50%,0.04)] transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 rounded-lg bg-[#2aa2c1] hover:bg-[#238a9f] text-white font-medium transition-colors">
          Confirm
        </button>
      </div>
    </div>
  )
}
```

---

## 19. Dos and Don'ts

### ✅ DO:
- Use the defined color palette consistently
- Apply transitions to interactive elements
- Use Tailwind utility classes for rapid styling
- Maintain spacing using the established scale
- Use feather icons from `react-icons/fi`
- Follow the dark theme throughout
- Ensure focus states are visible
- Test with keyboard navigation

### ❌ DON'T:
- Use arbitrary colors not in the palette
- Apply animations without transitions
- Break the established spacing rhythm
- Use images or raster graphics where icons work
- Introduce light mode variations
- Remove or obscure focus rings
- Use icon sizes inconsistent with the scale
- Mix different icon libraries

---

## 20. Theme Variables Summary

### Color Map
```javascript
const themeColors = {
  background: '#081727',
  surface: '#1e2b39',
  border: '#2f3d4d',
  borderHover: '#3a4a5c',
  primary: '#2aa2c1',
  primaryHover: '#238a9f',
  success: '#30a46c',
  danger: '#dc3545',
  dangerAlt: '#b91c1c',
  dangerHover: '#991b1b',
  auth: 'rgb(42, 162, 193)',
  textPrimary: 'hsla(0, 0%, 100%, 0.74)',
  textSecondary: 'hsla(0, 0%, 100%, 0.51)',
  textWhite: '#FFFFFF',
}

const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
}

const borderRadius = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  full: '9999px',
}
```

---

## 21. Implementation Checklist

When creating new components, ensure:
- [ ] Colors are from the defined palette
- [ ] Typography follows the established hierarchy
- [ ] Spacing uses the consistent scale
- [ ] Interactive elements have visible hover states
- [ ] Transitions are applied smoothly
- [ ] Focus states are clear and accessible
- [ ] Icons are from react-icons/fi
- [ ] Responsive behavior is considered
- [ ] Dark theme is maintained
- [ ] Borders and shadows follow the pattern
- [ ] No arbitrary styling outside the system

---

This design system ensures consistency, accessibility, and maintainability across the entire Traefik Dynamic Editor application. Follow these guidelines to create harmonious, professional UI components that match the existing codebase aesthetic.
