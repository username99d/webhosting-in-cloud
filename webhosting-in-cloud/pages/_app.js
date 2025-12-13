import "@/styles/globals.css";
import StudentPreferenceModal from '../components/StudentPreferenceModal';

export default function App({ Component, pageProps }) {
  return (
    <>
      <StudentPreferenceModal />
      <Component {...pageProps} />
    </>
  );
}
