import Bienvenida from "@/components/Home/Bienvenida";
export default function Home() {
  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 object-cover w-full h-full -z-10"
        playsInline
      >
        <source src="/videos/fondo1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10">
        <Bienvenida />
      </div>
    </div>
  );
}