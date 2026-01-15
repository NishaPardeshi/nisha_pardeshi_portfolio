# Data Scientist Portfolio - Interaction Design

## Core Interactive Components

### 1. Project Cards with Dual Action Buttons
- **Visual Design**: Grid layout of project cards with hover effects
- **Interaction**: Each card contains:
  - Clickable GitHub icon (links to project repository)
  - Clickable demo icon/globe icon (links to hosted project)
  - Card body shows project title, description, tech stack
- **Hover Effects**: Cards lift with shadow expansion, icons have color transitions
- **Behavior**: Smooth transitions, responsive grid that adapts to screen size

### 2. Navigation System
- **Visual Design**: Fixed top navigation bar with smooth scrolling
- **Interaction**: 
  - Home, About, Projects, Contact sections
  - Active page highlighting
  - Smooth scroll to sections on same page
- **Responsive**: Hamburger menu for mobile devices
- **Behavior**: Navigation background opacity changes on scroll

### 3. Contact Form with Validation
- **Visual Design**: Clean form with floating labels and validation states
- **Interaction**:
  - Name, email, subject, message fields
  - Real-time validation feedback
  - Submit button with loading state
  - Success/error message display
- **Behavior**: Form data validation, responsive error messages

### 4. Skills Showcase with Interactive Filters
- **Visual Design**: Skill categories with progress bars or skill meters
- **Interaction**:
  - Filter buttons for different skill categories (Python, ML, Data Viz, etc.)
  - Animated progress bars showing proficiency levels
  - Skill tags that highlight on hover
- **Behavior**: Smooth filtering animations, responsive layout

## User Experience Flow

1. **Landing**: User sees banner with profile picture and header, immediately understands this is a data scientist portfolio
2. **Project Exploration**: User can browse project cards, click GitHub to see code or demo to see live projects
3. **About Section**: User learns more about background and skills with interactive elements
4. **Contact**: User can easily reach out through validated contact form

## Technical Implementation Notes

- All interactions use vanilla JavaScript (no frameworks)
- Form validation uses HTML5 validation with custom JavaScript enhancements
- Project links open in new tabs for better UX
- Responsive design ensures functionality across all devices
- Smooth animations using CSS transitions and JavaScript
- No database required - all content is static HTML/CSS/JS