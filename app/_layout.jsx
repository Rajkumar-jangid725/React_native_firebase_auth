import { Slot } from 'expo-router';
import { GlobalStateProvider } from '../context/GlobalState';

export default function RootLayout() {
  return (
    <GlobalStateProvider>
      <Slot />
    </GlobalStateProvider>
  );
}