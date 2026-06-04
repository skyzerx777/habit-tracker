# Habit Tracker

A modern habit tracking application built with Vue 3 and TypeScript.

Track your daily habits, monitor streaks, analyze progress, and visualize completion rates through interactive charts.

## Features

### Habit Management
- Create new habits
- Edit existing habits
- Delete habits
- Customize habit icons and accent colors
- Optional habit descriptions

### Progress Tracking
- Mark habits as completed for any date
- Toggle completion status
- Current streak calculation
- Best streak calculation
- Total completed habits counter
- Daily completion progress

### Statistics
- Average completion rate
- Habit completion rate calculation
- Interactive completion rate chart
- Custom date range selection
- Overall progress overview

### Calendar View
- Monthly calendar navigation
- View completed days
- Mark and unmark completed dates directly from calendar
- Today's date highlighting

### User Experience
- Responsive design
- Mobile navigation
- Toast notifications
- Persistent local storage
- Smooth modal animations
- Custom 404 page

## Tech Stack

### Frontend
- Vue 3
- TypeScript
- Vite

### State Management
- Pinia

### Styling
- Tailwind CSS

### UI Components
- Headless UI

### Icons
- Lucide Icons

### Charts
- Apache ECharts
- vue-echarts

### Utilities
- VueUse
- Vue Toastification

### Routing
- Vue Router

## Screenshots

Add screenshots here.

### Dashboard

<img width="1440" height="765" alt="image" src="https://github.com/user-attachments/assets/9828f676-76f5-40e2-887c-b0a6a25bdc21" />

### Habit Details

<img width="1440" height="765" alt="image" src="https://github.com/user-attachments/assets/207538c1-9dc5-46eb-9877-2113811d037b" />

### Statistics

<img width="1440" height="765" alt="image" src="https://github.com/user-attachments/assets/85ffcc53-0d7b-4eae-a781-a4a6f499a4a5" />

## Installation

Clone the repository:

```bash
git clone https://github.com/skyzerx777/habit-tracker.git
```

Navigate to the project directory:

```bash
cd habit-tracker
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
├── stores/
├── constants/
├── router/
├── pages/
```

## Data Persistence

Habit data is stored locally in the browser using Local Storage. No backend is required.

## License

MIT License
