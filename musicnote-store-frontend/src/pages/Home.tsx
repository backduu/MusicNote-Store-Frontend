import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-note-bg">
        <Header />
        <main className="flex-1 pt-16 px-6">

        <div className="bg-red-500 text-white p-4">Tailwind Test</div>

        </main>
        <Footer />
      </div>         
    )
}