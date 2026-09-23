# AyuLife Sanctuary

AyuLife Sanctuary is an interactive, holistic web platform dedicated to preserving the ancient purity of Ayurveda. Built with modern web technologies, it offers users an immersive journey into Ayurvedic therapies, self-discovery through Dosha testing, and personalized holistic care.

## 🌟 Key Features

1. **Interactive Panchakarma Simulator**
   An engaging visualizer that explains the 5-folds of Panchakarma (Vamana, Virechana, Basti, Nasya, Raktamokshana). Users can explore the mechanisms, target organs, and clinical benefits of each therapy.

2. **3D Interactive Herb/Instrument Model**
   Utilizing React Three Fiber and 3D modeling (`morter-draco.glb`), the platform features an interactive 3D model of a Khalva Yantra (traditional Ayurvedic mortar and pestle) that responds to mouse movements, offering an immersive visual experience.

3. **Dosha Assessment Test**
   A personalized quiz allowing users to discover their primary Ayurvedic Dosha (Vata, Pitta, or Kapha) based on their physical and mental traits.

4. **Curated Video Gallery**
   An educational section providing a visual representation of Ayurvedic practices and lifestyle guidance through high-quality video content.

5. **Consultation Booking System**
   A streamlined booking form allowing users to schedule personalized Nadi Pariksha (Pulse Diagnosis) or holistic Panchakarma therapies directly.

## 🛠️ Technology Stack

- **Framework**: React 19, powered by Vite for lightning-fast HMR and optimized builds.
- **Styling**: Tailwind CSS v4, delivering a responsive, utility-first styling approach with custom Ayurvedic-inspired themes (Linen, Charcoal, Botanical, Terracotta, Sand).
- **3D Rendering**: `@react-three/fiber` and `@react-three/drei` along with `three.js` to render the immersive 3D Khalva Yantra model.
- **Icons**: `lucide-react` for beautiful and consistent iconography.

## 📂 Project Structure

```text
ayurveda/
├── public/                 # Static assets and 3D models (e.g., morter-draco.glb)
├── src/
│   ├── assets/             # Images and local SVGs
│   ├── components/         # React components
│   │   ├── BookingForm.jsx
│   │   ├── DoshaTest.jsx
│   │   ├── Header.jsx
│   │   ├── HeroSection.jsx
│   │   ├── InteractiveHerbModel.jsx
│   │   ├── LeafButton.jsx
│   │   ├── PanchakarmaSimulator.jsx
│   │   ├── VideoGallery.jsx
│   │   └── VideoModal.jsx
│   ├── App.jsx             # Main application layout and state
│   ├── index.css           # Global CSS and Tailwind directives
│   └── main.jsx            # Application entry point
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind theme customizations
└── vite.config.js          # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SOHAM0007-CODER/Ayurveda.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Ayurveda
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Building for Production

To create a production-ready build, run:
```bash
npm run build
```
The optimized files will be generated in the `dist` folder. You can preview the production build locally using `npm run preview`.

## 🎨 Design Philosophy

The application's design is heavily inspired by nature and ancient texts, utilizing a calm and earthy color palette (botanical greens, terracotta oranges, sand, and parchment hues). The user interface is crafted to evoke a sense of healing, mindfulness, and authenticity.
