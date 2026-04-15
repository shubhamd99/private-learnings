import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const AUTOPLAY_INTERVAL = 2500; // ms between auto-advances

export const SLIDES = [
  { id: '1', title: 'Slide 1', bg: '#FF6B6B' },
  { id: '2', title: 'Slide 2', bg: '#4ECDC4' },
  { id: '3', title: 'Slide 3', bg: '#45B7D1' },
  { id: '4', title: 'Slide 4', bg: '#96CEB4' },
  { id: '5', title: 'Slide 5', bg: '#FFEAA7' },
];
