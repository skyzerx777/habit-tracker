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

<img width="1440" height="900" alt="image" src="https://github.com/user-attachments/assets/4474c576-0894-4de6-9161-51ab57f8c8c2" />

### Habit Details

<img width="1440" height="900" alt="image" src="https://github.com/user-attachments/assets/5bdd48d6-ed86-46d7-a32b-0738c4644d11" />

### Statistics

<img width="1440" height="900" alt="image" src="https://github.com/user-attachments/assets/82ebada6-fd2d-4f99-99c1-d0560fe452cd" />

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
